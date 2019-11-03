import React, { useState, useEffect, useRef } from 'react';

import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import Users from '../../components/Users/Users';
import Modal from '../../components/Modal/Modal';

import Socket from '../../components/Socket/Socket'
import socketIOClient from 'socket.io-client';

import classes from './Chat.module.css';

const Chat = (props) => { 
  const socketRef = useRef();

  const [messageInputValue, setMessageInputValue] = useState('');
  const [message, setMessage] = useState({
    username: '',
    message: ''
  });
  const [messages, setMessages] = useState([]);
  const [loggingIn, setLoggingIn] = useState(true);
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socketRef.current = socketIOClient(Socket);
    socketRef.current.on('new message', receiveMessage);
    socketRef.current.on('new user', receiveUsers);
  }, []);

  const receiveUsers = user => {
    setUsers(users => users.concat(user));
  }

  const receiveMessage = message => {
    setMessages(msgs => msgs.concat(message));
  }

  const sendMessage = (message) => {
    socketRef.current.emit('new message', message);
  }

  const sendUsername = (username) => {
    socketRef.current.emit('new user', username);
  }

  const usernameEnteredHandler = (event) => {
    event.preventDefault();
    setUsernameInputValue('');
    setLoggingIn(prevState => !prevState);

    const submittedUsername = event.target.username.value;
    sendUsername(submittedUsername);
  }

  const submitMessageHandler = (event) => {
    event.preventDefault();
    setMessageInputValue('');

    const submittedMessage = event.target.message.value;
    setMessage(submittedMessage);
    sendMessage(submittedMessage);
  }

  const updateMessageInputValue = (event) => {
    setMessageInputValue(event.target.value);
  }

  const updateUsernameInputValue = (event) => {
    setUsernameInputValue(event.target.value);
  }
  
  return (
    <>
      {loggingIn
        ?
          <Modal 
            showBackdrop={loggingIn}
            submitted={usernameEnteredHandler}
            placeholder={"Enter a username"}
            name={"username"}
            value={usernameInputValue}
            changed={updateUsernameInputValue}
            buttonValue={"Submit"}
          /> 
        :  
          null
      }
      <Users 
        users={users}
      />
      <Messages
        messages={messages}
      />
      <div className={classes.Input}>
        <Input 
          submitted={submitMessageHandler}
          placeholder={"Enter a message"} 
          name={"message"} 
          value={messageInputValue}
          changed={updateMessageInputValue}
          buttonValue={"Send"}      
        />
      </div>  
    </>
  );
};

export default Chat;