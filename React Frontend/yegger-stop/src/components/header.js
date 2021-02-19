import React, { Component } from "react";
import { default as BSNavbar } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import '../styles/header.scss';

class Header extends Component {
    state = {};

    render() {
        return (
            <div className="navbar-wrapper">
                <BSNavbar collapseOnSelect expand="sm">
                    <BSNavbar.Brand className="logo">
                        YeggerStop
                    </BSNavbar.Brand>
                    <BSNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BSNavbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <Nav.Link target="_blank" href="http://www.github.com/shistevenyan">Github</Nav.Link>
                            <Nav.Link target="_blank" href="https://www.linkedin.com/in/shistevenyan">Creator</Nav.Link>
                        </Nav>
                    </BSNavbar.Collapse>
                </BSNavbar>
            </div>
        );
    }
}

export default Header;