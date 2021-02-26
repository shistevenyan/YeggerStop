import React, { Component } from "react";
import "../styles/searchBar.scss";

import Container from 'react-bootstrap/Container';

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
                var address = document.getElementById("pac-input").value
                app.setState({ location: address });
                app.props.onEnter(address)
            });
        }
        initAutocomplete();
    }

    handleChange = e => {
        this.setState({ location: e.target.value });
    };

    render() {
        return (
            <Container fluid={true}>
                <input
                    defaultValue={this.state.location}
                    onChange={this.handleChange}
                    id="pac-input"
                    className="control"
                    name="address"
                    type="text"
                    placeholder="Enter Address"
                />
            </Container>
        );
    }
}

export default SearchBar;