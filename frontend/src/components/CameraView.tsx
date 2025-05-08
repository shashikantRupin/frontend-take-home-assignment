import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import FaceScan from './FaceScan';
import { detectMood } from '../utils/moodDetection';
import '../styles/CameraView.css';

interface CameraViewProps {
  onMoodDetected: (mood: string) => void;
  onManualSelection: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onMoodDetected, onManualSelection }) => {
  const [cameraAccess, setCameraAccess] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (cameraAccess === true) {
      startCamera();
    }
  }, [cameraAccess]);

  const requestCameraAccess = () => {
    setCameraAccess(null); // Set to loading state
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setCameraAccess(true);
      })
      .catch(error => {
        console.error('Camera access denied:', error);
        setCameraAccess(false);
      });
  };

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
        setCameraAccess(false);
      });
  };

  const captureImage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!videoRef.current || !canvasRef.current) {
        reject('Video or canvas reference not available');
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) {
        reject('Canvas context not available');
        return;
      }

      // Set canvas dimensions to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to base64 image
      const imageData = canvas.toDataURL('image/jpeg');
      resolve(imageData);
    });
  };

  const handleCheckMood = async () => {
    if (!cameraAccess) return;
    
    setIsScanning(true);
    setScanError('');
    
    try {
      // First wait for 2.5 seconds to show the scanning animation
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Capture the image
      const imageData = await captureImage();
      
      // Detect mood from the image
      const detectedMood = await detectMood(imageData);
      
      // Pass the detected mood back to the parent component
      onMoodDetected(detectedMood);
    } catch (error) {
      console.error('Error during mood detection:', error);
      setScanError('Failed to detect mood. Please try again.');
      setIsScanning(false);
    }
  };

  if (cameraAccess === null) {
    // Initial state or loading
    return (
      <div className="camera-view">
        <div className="camera-prompt">
          <div className="camera-icon">
            <Camera size={48} />
          </div>
          <h2>Check Your Mood</h2>
          <p>We'd like to use your camera to check your mood and recommend a movie.</p>
          <button 
            className="primary-button" 
            onClick={requestCameraAccess}
          >
            Allow Camera Access
          </button>
          <button 
            className="secondary-button" 
            onClick={onManualSelection}
          >
            No Thanks, I'll Select Manually
          </button>
        </div>
      </div>
    );
  }

  if (cameraAccess === false) {
    // Camera access denied
    return (
      <div className="camera-view">
        <div className="camera-prompt">
          <div className="camera-icon camera-denied">
            <Camera size={48} />
          </div>
          <h2>Camera Access Denied</h2>
          <p>We can't access your camera. You can still choose your mood manually.</p>
          <button 
            className="primary-button" 
            onClick={onManualSelection}
          >
            Choose Mood Manually
          </button>
          <button 
            className="secondary-button" 
            onClick={requestCameraAccess}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="camera-view">
      <img 
        src="https://m.media-amazon.com/images/G/01/digital/video/web/Logo-min.png" 
        alt="Prime Video" 
        className="prime-video-logo" 
      />
      <p className="camera-instruction">Smile, frown, or just stare, We will read your face</p>
      <div className="video-container">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
        />
        {isScanning && <FaceScan />}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      
      {scanError && <p className="error-message">{scanError}</p>}
      
      <div className="camera-controls">
        <button 
          className="primary-button"
          onClick={handleCheckMood}
          disabled={isScanning}
        >
          {isScanning ? 'Scanning...' : 'Check My Mood'}
        </button>
        
        <p className="manual-option" onClick={onManualSelection}>
          No Pic? No problem! Choose your mood
        </p>
      </div>
    </div>
  );
};

export default CameraView;