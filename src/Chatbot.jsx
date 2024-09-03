// src/Chatbot.js
import React, { useState } from 'react';
import { generateChatResponse } from './openaiService';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { role: 'user', content: input };
      const updatedMessages = [...messages, newMessage];

      try {
        const generatedResponse = await generateChatResponse(updatedMessages);
        setMessages([...updatedMessages, { role: 'assistant', content: generatedResponse }]);
        setResponse(generatedResponse);
      } catch (error) {
        setResponse('Error generating response');
      }

      setInput(''); // Clear the input field
    }
  };

  return (
    <div>
      <h2>OpenAI Chatbot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default Chatbot;