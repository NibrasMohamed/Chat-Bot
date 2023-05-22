import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import data from '../Data/Starter.json';
import {agent} from "../Agent/Agent"

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const prompts = data.prompts;

  const handleBotMessage = (event, prompts) => {
    const response = agent(prompts);
    const botMessage = response.answer;
    setMessages((prevMessages) => [...prevMessages, { content: botMessage, sender: 'bot' }]);
    
  };

  const handleUserMessage = (event) => {
    event.preventDefault();
    const userMessage = event.target.elements.prompt.value;
    console.log('[message]', event);
    // Add user message to the chat
    setMessages((prevMessages) => [...prevMessages, { content: userMessage, sender: 'user' }]);

    setTimeout(() => {
      handleBotMessage(event, userMessage);
    }, 1000);
    // Clear the input field
    event.target.elements.prompt.value = '';
  };

  return (
    <Container maxWidth="sm">
      <h1>Chat Bot</h1>
      <Paper elevation={3} style={{ height: '400px', overflowY: 'scroll', marginBottom: '20px' }}>
        <div style={{ padding: '20px' }}>
          
          {messages.map((message, index) => (
            <Typography
              key={index}
              variant="body1"
              style={{ marginBottom: '10px', fontWeight: 'bold' }}
              align={message.sender === 'user' ? 'right' : 'left'}
            >
              {message.sender === 'user' ? 'You: ' : 'Bot: '}
              {message.content}
            </Typography>
          ))}
        </div>
      </Paper>
      <form onSubmit={handleUserMessage} style={{ display: 'flex' }}>
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          style={{ marginRight: '10px' }}
          name='prompt'
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  );
};

export default ChatBot;
