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
  state = {
    results: []
  };

  handleEnter = (address) => {
    fetch(`https://yeggerstop.herokuapp.com/stop_results?address=${address}`)
      .then(response => response.json())
      .then(data => { this.setState({ results: data.results }); console.log(data)} );
  }

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
            <SearchBar onEnter={this.handleEnter} />
          </Col>
        </Row>

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
