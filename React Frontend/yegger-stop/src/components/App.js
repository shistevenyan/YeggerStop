import React, { Component } from "react";
import '../styles/App.scss';

import Header from './header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  render() {
    
    return (
      
      <Container className="App">
        <Header />
      </Container>

    );
  }
}

export default App;
