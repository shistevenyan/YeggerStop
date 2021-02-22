import React, { Component } from "react";
import "../styles/searchBar.scss";

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
            <input
                defaultValue={this.state.location}
                onChange={this.handleChange}
                id="pac-input"
                className="control"
                type="text"
                placeholder="Enter Address"
            />
        );
    }
}

export default SearchBar;