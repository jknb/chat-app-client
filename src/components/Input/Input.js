import React from 'react';

import classes from './Input.module.css';

const Input = (props) => (
  <div className={classes.Input}>
    <input
      required 
      placeholder={props.placeholder}
      type="text"
      name={props.name}
      value={props.value}
      onChange={props.changed}
      onKeyPress={props.keyPressed}
    />
  </div>
);

export default Input;