import React from 'react';

import Input from '../Input/Input';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

const Modal = (props) => (
  <>
    <Backdrop showBackdrop={props.showBackdrop}/>
    <div className={classes.Modal}>
      <Input
        submitted={props.submitted}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        changed={props.changed}
        buttonValue={props.buttonValue}
      />
    </div>
  </>
);
    
export default Modal;