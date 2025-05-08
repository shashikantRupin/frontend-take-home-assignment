import React, { useState } from 'react';
import CameraView from './components/CameraView';
import MoodSelector from './components/MoodSelector';
import MovieRecommendation from './components/MovieRecommendation';
import './styles/App.css';

function App() {
  const [stage, setStage] = useState('camera'); // 'camera', 'mood-selector', 'recommendation'
  const [mood, setMood] = useState('');

  const handleMoodDetected = (detectedMood: string) => {
    setMood(detectedMood);
    setStage('recommendation');
  };

  const handleManualSelection = () => {
    setStage('mood-selector');
  };

  const handleMoodSelected = (selectedMood: string) => {
    setMood(selectedMood);
    setStage('recommendation');
  };

  const handleScanAgain = () => {
    setStage('camera');
    setMood('');
  };

  return (
    <div className="ad-container">
      {stage === 'camera' && (
        <CameraView 
          onMoodDetected={handleMoodDetected} 
          onManualSelection={handleManualSelection} 
        />
      )}
      
      {stage === 'mood-selector' && (
        <MoodSelector onMoodSelected={handleMoodSelected} />
      )}
      
      {stage === 'recommendation' && (
        <MovieRecommendation 
          mood={mood} 
          onScanAgain={handleScanAgain} 
        />
      )}
    </div>
  );
}

export default App;