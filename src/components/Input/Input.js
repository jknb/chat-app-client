import React from 'react';

import classes from './Input.module.css';

const Input = (props) => (
  <div className={classes.Input}>
    <form onSubmit={props.submitted}>
      <label>
        <input
          autoFocus
          required
          placeholder={props.placeholder}
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.changed} />
      </label>
      <input type="submit" value={props.buttonValue} />
    </form>
  </div>
);

export default Input;