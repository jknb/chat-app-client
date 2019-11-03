import React from 'react';

import classes from './Message.module.css';

const Message = (props) => (
  <div className={classes.Message}><strong>{props.username}: </strong>{props.message}</div>
);

export default Message;