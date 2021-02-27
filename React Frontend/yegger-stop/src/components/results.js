import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class Results extends Component {
    
    
    render() {
        return (
            <Card>

                <Card.Title> 
                    {this.props.data.stop_name} 
                </Card.Title>

                <Card.Subtitle className="mb-2 text-muted"> 
                    Bus Stop ID: {this.props.data.stop_id} 
                </Card.Subtitle>

                <Card.Text>
                    Live Buses: { this.props.data.live_bus_times.map(function(bus, index) { 
                        return <li key={ index }>{bus[0]} arriving at {bus[1]} </li>
                    })}
                    
                </Card.Text>
                
                <Card.Text>
                    Available Buses:               
                    { this.props.data.available_routes.map(function(route, index) { 
                        return  <li><Card.Link key={index} href={`https://webdocs.edmonton.ca/transit/route_schedules_and_maps/current/RT${route}.pdf`}> {route}</Card.Link></li>
                    })}
                </Card.Text>
                

            </Card>




        );
    }
}

export default Results;