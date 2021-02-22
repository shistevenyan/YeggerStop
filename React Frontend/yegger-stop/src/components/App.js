import React, { Component } from "react";
import '../styles/App.scss';

import SearchBar from './searchBar.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
  render() {
    
    return (
      
      <Container className="App">

        {/* <Col md = {12} className="info">
          YeggerStop is a Edmonton Transit System live-time bus finder. Enter an address in the search bar to find the 3 closest bus stops and its respective bus arrival times. 
          Click <a style={{ "color": "yellow" }} href={"https://github.com/shistevenyan"}> here</a> for the Github repository and click <a style={{ "color": "yellow" }} href={"http://www.linkedin.com/in/shistevenyan"}> here</a> for my creator. 
        </Col> */}

        <Row>
          <SearchBar />
        </Row>
        
        
      </Container>

    );
  }
}

export default App;
