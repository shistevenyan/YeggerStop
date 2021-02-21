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

        <Col md={12} className="info">
          YeggerStop is a live-time Edmonton Transit System bus stop and bus time finder. Enter an address in the search bar to find the 3 closest bus stops and its respective bus times. 
          Click <a style={{ "color":"yellow" }} href={"https://github.com/shistevenyan"}> here</a> for the Github repository.
        </Col>

        <Row>
          <TitlePage />
        </Row>
        
      </Container>

    );
  }
}

export default App;
