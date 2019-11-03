import React from 'react';
import Message from './Message/Message';

import uuid from 'uuid';
import classes from './Messages.module.css';

const Messages = props => {

  return (
    <>
      <div className={classes.Messages}>
        {props.messages.map(message =>
          <Message key={uuid()} username={message.username} message={message.message} />)
        }
      </div>
    </>
  )
};

export default Messages;