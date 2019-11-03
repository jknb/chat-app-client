import React from 'react';

import classes from './User.module.css';

const User = (props) => (
  <li className={classes.User}>{props.name}</li>
);

export default User;