import React, { useState, useEffect, useRef } from 'react';

import Input from '../../components/Input/Input';
import Messages from '../../components/Messages/Messages';
import Users from '../../components/Users/Users';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';

import Socket from '../../components/Socket/Socket'
import socketIOClient from 'socket.io-client';

import classes from './Chat.module.css';

const Chat = () => {
  const socketRef = useRef();

  const [inputValue, setInputValue] = useState({ username: '', message: '' });
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loggingIn, setLoggingIn] = useState(true);

  useEffect(() => {
    socketRef.current = socketIOClient(Socket);

    socketRef.current.on('new message', receiveMessage);
    socketRef.current.on('new username', receiveUser);
    socketRef.current.on('user left', (usernames) => setUsers(usernames));
  }, []);

  const receiveMessage = (message) => {
    setMessages(messages => messages.concat(message));
  }

  const receiveUser = (user) => {
    setUsers(users => users.concat(user));
  }

  const send = (event, data) => {
    socketRef.current.emit(event , data);
  }

  const submitHandler = (input) => {
    if (inputValue[input].trim().length > 0) {
      setInputValue(prevState => ({ ...prevState, [input]: '' }));
      send(`new ${input}`, inputValue[input]);
    }
  }

  const updateInputValue = (event, input) => {
    setInputValue({ ...inputValue, [input]: event.target.value });
  }

  return (
    <>
      {loggingIn
        ?
        <Modal showBackdrop={loggingIn}>
          <Input
            placeholder={'Enter a username'}
            value={inputValue.username}
            changed={(e) => updateInputValue(e, 'username')}
            keyPressed={(e) => {
              if (e.key === 'Enter') {
                submitHandler('username');
                setLoggingIn(prevState => !prevState);
              }
            }}
          />
          <Button
            value={'Submit'} 
            clicked={() => {
              submitHandler('username');
              setLoggingIn(prevState => !prevState);
            }}
          />
        </Modal>
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
          placeholder={'Enter a message'}
          value={inputValue.message}
          changed={(e) => updateInputValue(e, 'message')}
          keyPressed={(e) => e.key === 'Enter' && submitHandler('message')}
        />
        <Button
          value={'Send'}
          clicked={() => submitHandler('message')}
        />
      </div>
    </>
  );
};

export default Chat;