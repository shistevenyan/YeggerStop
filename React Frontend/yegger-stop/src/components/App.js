import React, { Component } from "react";
import '../styles/App.scss';

import Header from './header';
import TitlePage from './titlePage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  render() {
    
    return (
      
      <Container className="App">
        
        <Header />

        <Row>
          <TitlePage />
        </Row>
        
      </Container>

    );
  }
}

export default App;
