import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { RiChatVoiceAiFill, RiSendPlaneFill } from 'react-icons/ri';
import '../../index.css';
import { Mycontext } from '../../App.jsx';  // Import context

const AIChatbotModal = ({ open, onClose }) => {
  const { currentLocationData, fetchLocationData, isFetching } = useContext(Mycontext); // Use context

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
  const [isInitialMessageSent, setIsInitialMessageSent] = useState(false);

  const chatContainerRef = useRef(null);

  // Send initial message with location data
  useEffect(() => {
    if (!isInitialMessageSent && currentLocationData.location) {
      const initialMessage = `আমার বর্তমান অবস্থান ${currentLocationData.location}। এখানে তাপমাত্রা ${currentLocationData.temperature}°C, AQI ${currentLocationData.aqi}, এবং আর্দ্রতা ${currentLocationData.humidity}%। এখন আমার কোন ধরনের সেফটি গ্রহণ করা উচিত?`;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: initialMessage, sender: 'user' },
        { text: 'Thinking...', sender: 'ai', isThinking: true },
      ]);

      generateAIResponse(initialMessage);
      setIsInitialMessageSent(true);
    }
  }, [currentLocationData, isInitialMessageSent]);

  // Generate AI response using Gemini
  const generateAIResponse = async (message) => {
    setIsGeneratingAnswer(true);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        method: 'post',
        data: {
          contents: [{ parts: [{ text: message }] }],
        },
      });

      const aiResponse =
        response.data.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't process that.";

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.isThinking ? { text: aiResponse, sender: 'ai' } : msg
        )
      );
    } catch (error) {
      console.error('Error generating AI response:', error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.isThinking
            ? { text: 'Sorry - Something went wrong. Please try again!', sender: 'ai' }
            : msg
        )
      );
    }

    setIsGeneratingAnswer(false);
  };

  // Handle sending user messages
  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputMessage, sender: 'user' },
      { text: 'AI Thinking...', sender: 'ai', isThinking: true },
    ]);

    await generateAIResponse(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isGeneratingAnswer]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="chatbot-title">
        <RiChatVoiceAiFill className="chatbot-icon" /> AI ChatBot
      </DialogTitle>
      <DialogContent dividers>
        <div ref={chatContainerRef} className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === 'user' ? 'user-message' : 'ai-message'
              }`}
              style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <div className="input-container1">
          <TextField
            id="text-field"
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isGeneratingAnswer}
          />
          <Button
            color="primary"
            onClick={handleSendMessage}
            className="send-button"
            disabled={inputMessage.trim() === '' || isGeneratingAnswer}
          >
            {isGeneratingAnswer ? <CircularProgress size={20} /> : <RiSendPlaneFill />}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AIChatbotModal;
