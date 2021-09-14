import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
