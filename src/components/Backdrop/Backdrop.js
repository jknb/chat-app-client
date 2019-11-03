import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = (props) => (
  props.showBackdrop
    ? 
      <div className={classes.Backdrop}></div> 
    : 
      null
);

export default Backdrop;