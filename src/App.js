import React from 'react';

import Layout from './containers/Layout/Layout';
import Chat from './containers/Chat/Chat';

import classes from './App.module.css';

const App = () => {
  return (
    <>
      <Layout >
        <Chat />
      </Layout>
    </>    
  );
}

export default App;
