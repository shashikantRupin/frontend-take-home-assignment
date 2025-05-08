import React, { useState } from 'react';
import '../styles/MoodSelector.css';

interface MoodSelectorProps {
  onMoodSelected: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelected }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const moods = [
    { id: 'Happy', emoji: '😊', label: 'Happy' },
    { id: 'Excited', emoji: '🤩', label: 'Excited' },
    { id: 'Neutral', emoji: '😐', label: 'Neutral' },
    { id: 'Angry', emoji: '😡', label: 'Angry' },
    { id: 'Sad', emoji: '😢', label: 'Sad' }
  ];
  
  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
  };
  
  const handleConfirm = () => {
    if (selectedMood) {
      onMoodSelected(selectedMood);
    }
  };
  
  return (
    <div className="mood-selector">
      <h2>How are you feeling today?</h2>
      <p className="subtitle">Select your current mood</p>
      
      <div className="mood-options">
        {moods.map((mood) => (
          <div 
            key={mood.id} 
            className={`mood-option ${selectedMood === mood.id ? 'selected' : ''}`}
            onClick={() => handleMoodClick(mood.id)}
          >
            <div className="mood-emoji">{mood.emoji}</div>
            <div className="mood-label">{mood.label}</div>
          </div>
        ))}
      </div>
      
      <button 
        className={`primary-button ${!selectedMood ? 'disabled' : ''}`}
        onClick={handleConfirm}
        disabled={!selectedMood}
      >
        This is my mood
      </button>
    </div>
  );
};

export default MoodSelector;