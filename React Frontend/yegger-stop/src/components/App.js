import React, { Component } from "react";
import '../styles/App.scss';
import Logo from '../styles/YeggerStopLogo.png';

import SearchBar from './searchBar.js'
import Results from './results.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class App extends Component {
  state = {
    result: []
  };

  handleEnter = (address) => {
    fetch(`http://127.0.0.1:5000/stop_results?address=${address}`)
      .then(response => response.json())
      .then(data => this.setState({ result: data.result }));
  }

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
          <SearchBar onEnter={this.handleEnter} />
        </Row>

        <Row>
          <Results data={ this.state.result } />
        </Row>

        
        
        
      </Container>

    );
  }
}

export default App;
