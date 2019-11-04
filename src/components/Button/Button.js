import React from 'react';

import classes from './Button.module.css';

const Button = (props) => (
  <button 
    className={classes.Button}
    onClick={props.clicked}
  >{props.value}</button>
);

export default Button;