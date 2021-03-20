import React, { Component } from "react";
import '../styles/App.scss';
import Logo from '../styles/YeggerStopLogo.png';

import SearchBar from './searchBar.js'
import Results from './results.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import scrollToComponent from 'react-scroll-to-component';

class App extends Component {
  // Init a state to recieve the results of an API call
  state = {
    results: []
  };
  
  // Upon hitting the enter key, fetch the data from the API using the address provided from the React Front-End
  handleEnter = (address) => {
    fetch(`https://yeggerstop.herokuapp.com/stop_results?address=${address}`)
      .then(response => response.json())
      // Store the called API data into the state
      .then(data => { this.setState({ results: data.results }); console.log(data)} );
  }

  // If results are recieved from the API call, scroll to where the results are displayed
  componentDidUpdate() {
    scrollToComponent(this.results, { offset: 0, align: "top", duration: 500, ease: "out-circ" });
  }


  render() {
    
    return (
      
      <Container className="App">

        <Col md = {12} className="info">
          YeggerStop is an live-time ETS transit app. Enter an address in the search bar to find close by buses. 
          Click <a style={{ "color": "yellow" }} href={"https://github.com/shistevenyan/YeggerStop"}> here</a> for the Github repository and click <a style={{ "color": "yellow" }} href={"http://www.linkedin.com/in/shistevenyan"}> here</a> for my creator. 
        </Col>

        <Row className="logo-container">
          <Col>
            <img responsive src={Logo} className="logo" alt="logo" />
          </Col>
        </Row>
        
        <Row>
          <Col>
            {/* Handling the onEnter of the search bar */}
            <SearchBar onEnter={this.handleEnter} />
          </Col>
        </Row>

        {/* First, checking if there are results. If there are, display them from the state */}
        {/* This could be improved on by using map to get keys and use indexes next time instead of hard coding */}
        { ((this.state.results).length > 0 ? 

          <Row className="results-space" ref={(Col) => { this.results = Col; }}>
          <Col sm={12} md={12}>
              <Results data={this.state.results[0]} />
          </Col>

          <Col sm={12} md={12}>
            <Results data={this.state.results[1]} />
          </Col>

          <Col sm={12} md={12}>
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
