import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Loading from './components/Loading';
import Content from './Content';

class App extends React.Component {
  componentDidMount() {
    <Content />;
  }

  componentDidUpdate() {
    <Loading />;
  }

  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
