import { movieData } from './movieData';

// This function simulates an API call to OpenAI for mood detection
// In a real implementation, you would make an actual API call to OpenAI
export const detectMood = async (imageData: string): Promise<string> => {
  // Remove the "data:image/jpeg;base64," part
  // const base64Image = imageData.split(',')[1];
  
  // In a real implementation, you would make an API call to OpenAI
  // For this example, we'll simulate the API call with a random response
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulating API response by randomly selecting a mood
      const moods = Object.keys(movieData);
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      
      // Return the randomly selected mood
      resolve(randomMood);
    }, 1000); // Simulate a 1-second API call
  });
};

// In a real implementation, the function would look something like this:
/*
export const detectMood = async (imageData: string): Promise<string> => {
  // Remove the "data:image/jpeg;base64," part
  const base64Image = imageData.split(',')[1];
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "What mood is the person in this image? Choose one of: Happy, Excited, Neutral, Angry, Sad."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    
    // Extract mood from the response
    const content = data.choices[0].message.content;
    
    // Parse the response to get one of our defined moods
    let detectedMood = 'Neutral'; // Default fallback
    
    if (content.includes('Happy')) detectedMood = 'Happy';
    else if (content.includes('Excited')) detectedMood = 'Excited';
    else if (content.includes('Angry')) detectedMood = 'Angry';
    else if (content.includes('Sad')) detectedMood = 'Sad';
    
    return detectedMood;
  } catch (error) {
    console.error('Error detecting mood:', error);
    return 'Neutral'; // Default to neutral on error
  }
};
*/