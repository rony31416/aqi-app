
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField
// } from '@mui/material';
// import { RiChatVoiceAiFill, RiSendPlaneFill } from 'react-icons/ri';
// import '../../index.css';

// const AIChatbotModal = ({ open, onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === '') return;

//     const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
//     setMessages(newMessages);

//     const aiResponse = {
//       text: `You said: ${inputMessage}`,
//       sender: 'ai'
//     };

//     setMessages([...newMessages, aiResponse]);
//     setInputMessage('');
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle className="chatbot-title">
//         <RiChatVoiceAiFill className="chatbot-icon" /> AI ChatBot
//       </DialogTitle>
//       <DialogContent dividers>
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`chat-message ${
//                 message.sender === 'user' ? 'user-message' : 'ai-message'
//               }`}
//             >
//               {message.text}
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <div className="input-container1">
//           <TextField id="text-field"
//             fullWidth
//             variant="outlined"
//             placeholder="Type your message..."
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//           />
//           <Button
//             color="primary"
//             onClick={handleSendMessage}
//             className="send-button"
//             disabled={inputMessage.trim() === ''}
//           >
//             <RiSendPlaneFill />
//           </Button>
//         </div>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AIChatbotModal;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   CircularProgress
// } from '@mui/material';
// import { RiChatVoiceAiFill, RiSendPlaneFill } from 'react-icons/ri';
// import '../../index.css';

// const AIChatbotModal = ({ open, onClose }) => {
//   const [currentLocationData, setCurrentLocationData] = useState({
//     aqi: null,
//     temperature: null,
//     humidity: null,
//     location: null,
//   });

//   const [isFetching, setIsFetching] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);

//   const chatContainerRef = useRef(null);

//   // Fetch location data
//   const fetchLocationData = async () => {
//     setIsFetching(true);

//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude } = position.coords;
//       const aqicnToken = import.meta.env.VITE_AQICN_API_TOKEN;
//       const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

//       try {
//         const aqiResponse = await fetch(
//           `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqicnToken}`
//         );
//         const aqiData = await aqiResponse.json();

//         const weatherResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
//         );
//         const weatherData = await weatherResponse.json();

//         const locationData = {
//           aqi: aqiData.data.aqi || "N/A",
//           temperature: weatherData.main.temp || "N/A",
//           humidity: weatherData.main.humidity || "N/A",
//           location: weatherData.name || "N/A",
//         };

//         setCurrentLocationData(locationData);

//         // Send initial location-based message
//         const initialMessage = `আমার বর্তমান অবস্থান ${locationData.location}. এখানে তাপমাত্রা ${locationData.temperature}°C, AQI ${locationData.aqi}, এবং আর্দ্রতা ${locationData.humidity}%. এখন আমার কোন ধরনের সেফটি গ্রহণ করা উচিত?`;
        
//         // Generate AI response for initial message
//         await generateAIResponse(initialMessage);

//       } catch (error) {
//         console.error("Error fetching location data:", error);
//       } finally {
//         setIsFetching(false);
//       }
//     });
//   };

//   // Generate AI response using Gemini
//   const generateAIResponse = async (message) => {
//     setIsGeneratingAnswer(true);

//     try {
//       const response = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
//           import.meta.env.VITE_GEMINI_API_KEY
//         }`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: message }] }],
//         },
//       });

//       const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"] || "Sorry, I couldn't process that.";

//       // Update messages with user and AI responses
//       setMessages(prevMessages => [
//         ...prevMessages, 
//         { text: message, sender: 'user' },
//         { text: aiResponse, sender: 'ai' }
//       ]);

//     } catch (error) {
//       console.error("Error generating AI response:", error);
//       setMessages(prevMessages => [
//         ...prevMessages,
//         { text: message, sender: 'user' },
//         { text: "Sorry - Something went wrong. Please try again!", sender: 'ai' }
//       ]);
//     }

//     setIsGeneratingAnswer(false);
//   };

//   // Handle sending user messages
//   const handleSendMessage = async () => {
//     if (inputMessage.trim() === '') return;

//     await generateAIResponse(inputMessage);
//     setInputMessage('');
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   // Fetch location data on component mount
//   useEffect(() => {
//     fetchLocationData();
//     const intervalId = setInterval(fetchLocationData, 60 * 60 * 1000); // 1 hour interval
//     return () => clearInterval(intervalId);
//   }, []);

//   // Auto-scroll to bottom of chat
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages, isGeneratingAnswer]);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle className="chatbot-title">
//         <RiChatVoiceAiFill className="chatbot-icon" /> AI ChatBot
//       </DialogTitle>
//       <DialogContent dividers>
//         <div ref={chatContainerRef} className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`chat-message ${
//                 message.sender === 'user' ? 'user-message' : 'ai-message'
//               }`}
//             >
//               {message.text}
//             </div>
//           ))}
//           {isGeneratingAnswer && (
//             <div className="chat-message ai-message">
//               <CircularProgress size={20} />
//             </div>
//           )}
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <div className="input-container1">
//           <TextField 
//             id="text-field"
//             fullWidth
//             variant="outlined"
//             placeholder="Type your message..."
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             disabled={isGeneratingAnswer}
//           />
//           <Button
//             color="primary"
//             onClick={handleSendMessage}
//             className="send-button"
//             disabled={inputMessage.trim() === '' || isGeneratingAnswer}
//           >
//             {isGeneratingAnswer ? <CircularProgress size={20} /> : <RiSendPlaneFill />}
//           </Button>
//         </div>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AIChatbotModal;

// import React, { useState, useEffect, useRef } from 'react';
// import ReactMarkdown from 'react-markdown';
// import axios from 'axios';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   CircularProgress
// } from '@mui/material';
// import { RiChatVoiceAiFill, RiSendPlaneFill } from 'react-icons/ri';
// import '../../index.css';

// const AIChatbotModal = ({ open, onClose }) => {
//   const [currentLocationData, setCurrentLocationData] = useState({
//     aqi: null,
//     temperature: null,
//     humidity: null,
//     location: null,
//   });

//   const [isFetching, setIsFetching] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
//   const [isInitialMessageSent, setIsInitialMessageSent] = useState(false);

//   const chatContainerRef = useRef(null);

//   // Fetch location data
//   const fetchLocationData = async () => {
//     setIsFetching(true);

//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude } = position.coords;
//       const aqicnToken = import.meta.env.VITE_AQICN_API_TOKEN;
//       const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

//       try {
//         const aqiResponse = await fetch(
//           `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqicnToken}`
//         );
//         const aqiData = await aqiResponse.json();

//         const weatherResponse = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
//         );
//         const weatherData = await weatherResponse.json();

//         const locationData = {
//           aqi: aqiData.data.aqi || "N/A",
//           temperature: weatherData.main.temp || "N/A",
//           humidity: weatherData.main.humidity || "N/A",
//           location: weatherData.name || "N/A",
//         };

//         setCurrentLocationData(locationData);

//         // Send initial location-based message only if not sent before
//         if (!isInitialMessageSent) {
//           const initialMessage = `আমার বর্তমান অবস্থান ${locationData.location}। এখানে তাপমাত্রা ${locationData.temperature}°C, AQI ${locationData.aqi}, এবং আর্দ্রতা ${locationData.humidity}%। এখন আমার কোন ধরনের সেফটি গ্রহণ করা উচিত?`;
          
//           // Add user message first
//           setMessages(prevMessages => [
//             ...prevMessages,
//             { text: initialMessage, sender: 'user' }
//           ]);

//           // Generate AI response
//           await generateAIResponse(initialMessage);
          
//           setIsInitialMessageSent(true);
//         }

//       } catch (error) {
//         console.error("Error fetching location data:", error);
//       } finally {
//         setIsFetching(false);
//       }
//     });
//   };

//   // Generate AI response using Gemini
//   const generateAIResponse = async (message) => {
//     setIsGeneratingAnswer(true);

//     try {
//       const response = await axios({
//         url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
//           import.meta.env.VITE_GEMINI_API_KEY
//         }`,
//         method: "post",
//         data: {
//           contents: [{ parts: [{ text: message }] }],
//         },
//       });

//       const aiResponse = response["data"]["candidates"][0]["content"]["parts"][0]["text"] || "Sorry, I couldn't process that.";

//       // Update messages with AI response
//       setMessages(prevMessages => [
//         ...prevMessages, 
//         { text: aiResponse, sender: 'ai' }
//       ]);

//     } catch (error) {
//       console.error("Error generating AI response:", error);
//       setMessages(prevMessages => [
//         ...prevMessages,
//         { text: "Sorry - Something went wrong. Please try again!", sender: 'ai' }
//       ]);
//     }

//     setIsGeneratingAnswer(false);
//   };

//   // Handle sending user messages
//   const handleSendMessage = async () => {
//     if (inputMessage.trim() === '') return;

//     // Add user message
//     setMessages(prevMessages => [
//       ...prevMessages,
//       { text: inputMessage, sender: 'user' }
//     ]);

//     await generateAIResponse(inputMessage);
//     setInputMessage('');
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   // Fetch location data on component mount
//   useEffect(() => {
//     fetchLocationData();
//     const intervalId = setInterval(fetchLocationData, 60 * 60 * 1000); // 1 hour interval
//     return () => clearInterval(intervalId);
//   }, []);

//   // Auto-scroll to bottom of chat
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages, isGeneratingAnswer]);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle className="chatbot-title">
//         <RiChatVoiceAiFill className="chatbot-icon" /> AI ChatBot
//       </DialogTitle>
//       <DialogContent dividers>
//         <div ref={chatContainerRef} className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`chat-message ${
//                 message.sender === 'user' ? 'user-message' : 'ai-message'
//               }`}
//               style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
//             >
//               {message.text}
//             </div>
//           ))}
//           {isGeneratingAnswer && (
//             <div className="chat-message ai-message">
//               <CircularProgress size={20} />
//             </div>
//           )}
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <div className="input-container1">
//           <TextField 
//             id="text-field"
//             fullWidth
//             variant="outlined"
//             placeholder="Type your message..."
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             disabled={isGeneratingAnswer}
//           />
//           <Button
//             color="primary"
//             onClick={handleSendMessage}
//             className="send-button"
//             disabled={inputMessage.trim() === '' || isGeneratingAnswer}
//           >
//             {isGeneratingAnswer ? <CircularProgress size={20} /> : <RiSendPlaneFill />}
//           </Button>
//         </div>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AIChatbotModal;


import React, { useState, useEffect, useRef } from 'react';
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

const AIChatbotModal = ({ open, onClose }) => {
  const [currentLocationData, setCurrentLocationData] = useState({
    aqi: null,
    temperature: null,
    humidity: null,
    location: null,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
  const [isInitialMessageSent, setIsInitialMessageSent] = useState(false);

  const chatContainerRef = useRef(null);

  // Fetch location data
  const fetchLocationData = async () => {
    if (isFetching) return;
    setIsFetching(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const aqicnToken = import.meta.env.VITE_AQICN_API_TOKEN;
      const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

      try {
        const aqiResponse = await fetch(
          `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqicnToken}`
        );
        const aqiData = await aqiResponse.json();

        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`
        );
        const weatherData = await weatherResponse.json();

        const locationData = {
          aqi: aqiData.data.aqi || 'N/A',
          temperature: weatherData.main.temp || 'N/A',
          humidity: weatherData.main.humidity || 'N/A',
          location: weatherData.name || 'N/A',
        };

        setCurrentLocationData(locationData);

        if (!isInitialMessageSent) {
          const initialMessage = `আমার বর্তমান অবস্থান ${locationData.location}। এখানে তাপমাত্রা ${locationData.temperature}°C, AQI ${locationData.aqi}, এবং আর্দ্রতা ${locationData.humidity}%। এখন আমার কোন ধরনের সেফটি গ্রহণ করা উচিত?`;

          setMessages((prevMessages) => [
            ...prevMessages,
            { text: initialMessage, sender: 'user' },
            { text: 'Thinking...', sender: 'ai', isThinking: true },
          ]);

          await generateAIResponse(initialMessage);
          setIsInitialMessageSent(true);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      } finally {
        setIsFetching(false);
      }
    });
  };

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

      // Update messages with AI response
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.isThinking
            ? { text: aiResponse, sender: 'ai' }
            : msg
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

    // Add user message
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

  // Fetch location data on component mount
  useEffect(() => {
    fetchLocationData();
    const intervalId = setInterval(fetchLocationData, 60 * 60 * 1000); // 1 hour interval
    return () => clearInterval(intervalId);
  }, []);

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
