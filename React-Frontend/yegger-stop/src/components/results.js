import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import '../styles/results.scss';

class Results extends Component {
    
    
    render() {
        return (
            <Card border="light" className="card">

                <Card.Title className="card-title"> 
                    {this.props.data.stop_name} 
                </Card.Title>

                <Card.Subtitle className="card-subtitle"> 
                    Bus Stop ID: {this.props.data.stop_id} 
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${this.props.data.lat},${this.props.data.long}`}> (Navigate)</a>
                </Card.Subtitle>
                <br></br>
                <Card.Text className="card-text">
                    Live Buses: { this.props.data.live_bus_times.map(function(bus, index) { 
                        return <li key={ index }>{bus[0]} arriving at {bus[1]} </li>
                    })}
                    
                </Card.Text>
                
                <Card.Text className="card-text">
                    Available Buses at Stop:               
                    { this.props.data.available_routes.map(function(route, index) { 
                        return  <li key={ index }><Card.Link href={`https://webdocs.edmonton.ca/transit/route_schedules_and_maps/current/RT${route}.pdf`}> {route}</Card.Link></li>
                    })}
                </Card.Text>
                

            </Card>




        );
    }
}

export default Results;