import React, { Component } from "react";
import "../styles/searchBar.scss";
import ReactDOM from 'react-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SearchBar extends Component {
    state = {
        location: ""
    };

    componentDidMount() {
        const app = this;
        function initAutocomplete() {
            var input = document.getElementById("pac-input");
            var searchBox = new window.google.maps.places.SearchBox(input);
            searchBox.addListener("places_changed", function () {
                app.setState({ location: document.getElementById("pac-input").value });
            });
        }
        initAutocomplete();
    }

    handleChange = e => {
        this.setState({ location: e.target.value });
    };

    render() {
        return (
            <Container>
                <form action="http://localhost:5000/address" method="get">
                    <input
                        defaultValue={this.state.location}
                        onChange={this.handleChange}
                        id="pac-input"
                        className="control"
                        name="address"
                        type="text"
                        placeholder="Enter Address"
                    />
                </form>
            </Container>
        );
    }
}

export default SearchBar;