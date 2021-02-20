import React, { Component } from "react";
import { default as BSNavbar } from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import '../styles/header.scss';


class Header extends Component {
    render() {
        return (
            <div className="navbar-wrapper">
                <BSNavbar class="navbar navbar-light bg-light" collapseOnSelect expand="sm">
                    <BSNavbar.Brand className="logo">
                        YS
                    </BSNavbar.Brand>
                    <BSNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BSNavbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <Nav.Link className="nav-link" target="_blank" href="http://www.github.com/shistevenyan">Github</Nav.Link>
                            <Nav.Link className="nav-link" target="_blank" href="http://www.linkedin.com/in/shistevenyan">Creator</Nav.Link>
                        </Nav>
                    </BSNavbar.Collapse>
                </BSNavbar>
            </div>
        );
    }
}

export default Header;