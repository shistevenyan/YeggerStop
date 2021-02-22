import React, { Component } from "react";
import '../styles/App.scss';
import Logo from '../styles/YeggerStopLogo.png';

import SearchBar from './searchBar.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class App extends Component {
  render() {
    
    return (
      
      <Container className="App">

        <Col md = {12} className="info">
          YeggerStop is an live-time ETS transit app. Enter an address in the search bar to close by buses. 
          Click <a style={{ "color": "yellow" }} href={"https://github.com/shistevenyan"}> here</a> for the Github repository and click <a style={{ "color": "yellow" }} href={"http://www.linkedin.com/in/shistevenyan"}> here</a> for my creator. 
        </Col>

        <Row className="logo-container">
          <img responsive src={Logo} className="logo" alt="logo" />
        </Row>
        

        <Row>
          <SearchBar />
        </Row>
        
        
      </Container>

    );
  }
}

export default App;
