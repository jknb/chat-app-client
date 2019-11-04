import React from 'react';

import Layout from './containers/Layout/Layout';
import Chat from './containers/Chat/Chat';

const App = () => {
  return (
    <>
      <Layout>
        <Chat />
      </Layout>
    </>    
  );
}

export default App;
