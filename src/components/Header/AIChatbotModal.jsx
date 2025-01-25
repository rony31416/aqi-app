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

// const AIChatbotModal = ({ open, onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   const handleSendMessage = () => {
//     if (inputMessage.trim() === '') return;

//     // Add user message
//     const newMessages = [...messages, { 
//       text: inputMessage, 
//       sender: 'user' 
//     }];
//     setMessages(newMessages);

//     // Simulate AI response (replace with actual AI logic)
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
//     <Dialog 
//       open={open} 
//       onClose={onClose} 
//       maxWidth="md" 
//       fullWidth
//     >
//       <DialogTitle>
//         <RiChatVoiceAiFill /> AI ChatBot
//       </DialogTitle>
//       <DialogContent dividers>
//         <div className="chat-messages" style={{ 
//           height: '400px', 
//           overflowY: 'auto',
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           {messages.map((message, index) => (
//             <div 
//               key={index} 
//               style={{ 
//                 alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
//                 margin: '10px',
//                 padding: '10px',
//                 borderRadius: '10px',
//                 backgroundColor: message.sender === 'user' ? '#e6f2ff' : '#f0f0f0',
//                 maxWidth: '70%'
//               }}
//             >
//               {message.text}
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Type your message..."
//           value={inputMessage}
//           onChange={(e) => setInputMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           InputProps={{
//             endAdornment: (
//               <Button 
//                 color="primary" 
//                 onClick={handleSendMessage}
//                 disabled={inputMessage.trim() === ''}
//               >
//                 <RiSendPlaneFill />
//               </Button>
//             )
//           }}
//         />
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AIChatbotModal;


import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import { RiChatVoiceAiFill, RiSendPlaneFill } from 'react-icons/ri';
import '../../index.css';

const AIChatbotModal = ({ open, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);

    const aiResponse = {
      text: `You said: ${inputMessage}`,
      sender: 'ai'
    };

    setMessages([...newMessages, aiResponse]);
    setInputMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="chatbot-title">
        <RiChatVoiceAiFill className="chatbot-icon" /> AI ChatBot
      </DialogTitle>
      <DialogContent dividers>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === 'user' ? 'user-message' : 'ai-message'
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <div className="input-container1">
          <TextField id="text-field"
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            color="primary"
            onClick={handleSendMessage}
            className="send-button"
            disabled={inputMessage.trim() === ''}
          >
            <RiSendPlaneFill />
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AIChatbotModal;
