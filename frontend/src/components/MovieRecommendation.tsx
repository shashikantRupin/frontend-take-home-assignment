import React, { useEffect, useState } from 'react';
import { movieData } from '../utils/movieData';
import '../styles/MovieRecommendation.css';

interface MovieRecommendationProps {
  mood: string;
  onScanAgain: () => void;
}

const MovieRecommendation: React.FC<MovieRecommendationProps> = ({ mood, onScanAgain }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<typeof movieData.Happy | null>(null);
  
  useEffect(() => {
    // Simulate loading for a better UX
    const timeout = setTimeout(() => {
      // Default to Neutral if mood is not valid
      const validMood = ['Happy', 'Excited', 'Neutral', 'Angry', 'Sad'].includes(mood) 
        ? mood 
        : 'Neutral';
      
      // Get movie based on mood
      const recommendedMovie = movieData[validMood as keyof typeof movieData];
      setMovie(recommendedMovie);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timeout);
  }, [mood]);
  
  if (isLoading) {
    return (
      <div className="recommendation-loading">
        <div className="loading-spinner"></div>
        <p>Finding the perfect movie for you...</p>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="recommendation-error">
        <h3>Something went wrong</h3>
        <p>We couldn't find a movie recommendation.</p>
        <button className="primary-button" onClick={onScanAgain}>
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="movie-recommendation">
      <div className="recommendation-header">
        <h2>Based on your {mood.toLowerCase()} mood</h2>
        <p className="subtitle">We recommend:</p>
      </div>
      
      <div className="movie-card">
        <div className="movie-thumbnail">
          <img src={movie.thumbnail} alt={movie.name} />
          <div className="movie-gradient-overlay"></div>
        </div>
        
        <div className="movie-info">
          <h3 className="movie-title">{movie.name}</h3>
          <p className="movie-mood">Perfect for your {mood.toLowerCase()} mood</p>
        </div>
      </div>
      
      <div className="recommendation-actions">
        <a 
          href={movie.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="primary-button watch-button"
        >
          Watch Now
        </a>
        
        <button 
          className="secondary-button" 
          onClick={onScanAgain}
        >
          Scan Again
        </button>
      </div>
    </div>
  );
};

export default MovieRecommendation;