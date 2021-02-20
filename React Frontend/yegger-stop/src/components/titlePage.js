import React, { Component } from 'react';
import '../styles/titlePage.scss';
import titleLogo from '../styles/YeggerStopLogo.png';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class titlePage extends Component {
    render() {
        return (
            <Container className="titlePage">
                <br></br>
                <Row>
                    <Col></Col>
                    <Col><img src={titleLogo} /></Col>
                    <Col></Col>
                </Row>
            </Container>

        );
    }
}

export default titlePage;