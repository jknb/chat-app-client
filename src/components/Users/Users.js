import React from 'react';
import User from './User/User';

import classes from './Users.module.css';
import uuid from 'uuid';

const Users = (props) => (
  <ul className={classes.Users}>
    {props.users.map(user => {
      return <User key={uuid()} name={user} />
    })}
  </ul>
);

export default Users;