import React, { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import '../styles/searchBar.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };

    render() {
        return (
            <Container className="searchBar">
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <Row>
                            <input type="text" className='location-search-input' placeholder='Enter Address'
                                {...getInputProps({
                                })}
                            />
                            <Container className="autocomplete-dropdown-container"> 
                                {loading && <Row className="input-suggestion">Loading...</Row>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <Row className="input-suggestion"
                                            {...getSuggestionItemProps(suggestion, {
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </Row>
                                    );
                                })}
                            </Container>
                        </Row>
                    )}
                </PlacesAutocomplete>
            </Container>
        );
    }
}

export default SearchBar;