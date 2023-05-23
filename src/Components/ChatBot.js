import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import Agent from "../Agent/Agent"
import { connect, useSelector } from 'react-redux';

const ChatBot = (myState) => {
  const [messages, setMessages] = useState([]);
  
  const handleBotMessage = (event, prompts) => {
    console.log('[prompts]', prompts);
    setMessages((prevMessages, index) => [...prevMessages, { content: <Agent key={index} prompt={prompts} handleExtraClicks={(e)=>handleExtraClicks(e)}/>, sender: 'bot' }]);
  };

  const handleExtraClicks = (event) => {
    const message = "You have selected " + event.target.value
    setMessages((prevMessages) => [...prevMessages, { content: message, sender: 'user' }]);
    setTimeout(() => {
      handleBotMessage(event, "");
    }, 1000);
  }
  const handleUserMessage = (event) => {
    event.preventDefault();
    const userMessage = event.target.elements.prompt.value;

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
            message.sender === 'user'?
            <Typography
              key={index}
              variant="body1"
              style={{ marginBottom: '10px', fontWeight: 'bold' }}
              align={message.sender === 'user' ? 'right' : 'left'}
            >
              {message.content}
            </Typography>
            :message.content
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

const mapStateToProps = (state) => ({
  myState: state.agent  
})
export default connect(mapStateToProps)(ChatBot);
