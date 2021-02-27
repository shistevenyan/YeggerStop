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
    results: []
  };

  handleEnter = (address) => {
    fetch(`http://127.0.0.1:5000/stop_results?address=${address}`)
      .then(response => response.json())
      .then(data => { this.setState({ results: data.results }); console.log(data)} );
  }


  render() {
    
    return (
      
      <Container className="App">

        <Col md = {12} className="info">
          YeggerStop is an live-time ETS transit app. Enter an address in the search bar to close by buses. 
          Click <a style={{ "color": "yellow" }} href={"https://github.com/shistevenyan"}> here</a> for the Github repository and click <a style={{ "color": "yellow" }} href={"http://www.linkedin.com/in/shistevenyan"}> here</a> for my creator. 
        </Col>

        <Row className="logo-container">
          <Col>
            <img responsive src={Logo} className="logo" alt="logo" />
          </Col>
        </Row>
        
        <Row>
          <Col>
            <SearchBar onEnter={this.handleEnter} />
          </Col>
        </Row>

        { ((this.state.results).length > 0 ? 

        <Row>
          <Col sm={12} md={4}>
              <Results data={this.state.results[0]} />
          </Col>

          <Col sm={12} md={4}>
            <Results data={this.state.results[1]} />
          </Col>

          <Col sm={12} md={4}>
            <Results data={this.state.results[2]} />
          </Col>
          
        </Row> 
        : 
        null) }
        

        
        
        
      </Container>

    );
  }
}

export default App;
