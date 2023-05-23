import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import data from '../Data/Starter.json';
import Agent from "../Agent/Agent"
import { connect, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setVehicle, resetVehicle } from '../Store/agentReducer';

const ChatBot = (myState) => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState();
  const selected_vehicle = useSelector((state) => state.agent.selected_vehicle)
  const current_chat_mode = useSelector((state) => state.agent.current_chat_mode)
  const dispatch = useDispatch();
  
  const handleBotMessage = (event, prompts) => {
    console.log('[prompts]', prompts);
    setMessages((prevMessages) => [...prevMessages, { content: <Agent prompt={prompts}/>, sender: 'bot' }]);
    dispatch(setVehicle("bike"));
  };

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
