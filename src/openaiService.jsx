import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const openaiService = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
});

export const generateChatResponse = async (messages) => {
  try {
    const response = await openaiService.post('/chat/completions', {
      model: 'gpt-3.5-turbo', 
      messages: messages, 
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};