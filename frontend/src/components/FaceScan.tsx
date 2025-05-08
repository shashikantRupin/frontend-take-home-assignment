import React, { useEffect, useRef } from 'react';
import '../styles/FaceScan.css';

const FaceScan: React.FC = () => {
  const scannerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scanner = scannerRef.current;
    if (scanner) {
      scanner.classList.add('scanning');
    }
    
    return () => {
      if (scanner) {
        scanner.classList.remove('scanning');
      }
    };
  }, []);
  
  return (
    <div className="face-scan-container">
      <div className="face-outline">
        <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,20 
                  C 140,20 170,50 170,100
                  C 170,150 150,200 100,230
                  C 50,200 30,150 30,100
                  C 30,50 60,20 100,20 Z" 
                fill="none" 
                stroke="#00a8ff" 
                strokeWidth="2"
                strokeDasharray="5,5" />
        </svg>
      </div>
      <div ref={scannerRef} className="scan-line"></div>
      <div className="scan-target-corners">
        <div className="corner top-left"></div>
        <div className="corner top-right"></div>
        <div className="corner bottom-left"></div>
        <div className="corner bottom-right"></div>
      </div>
      <div className="scan-data">
        <div className="scan-text">Processing...</div>
        <div className="scan-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
};

export default FaceScan;