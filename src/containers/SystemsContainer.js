import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import uuid from 'uuid'
import System from '../components/System';

export default class SystemsContainer extends React.Component {

    // state = {
    //     allSystems: []
    // }

    // componentDidMount() {
    //     this.setState({allSystems: this.props.systems})
    // }

    render() {
        return (
            <Card className="systems-container-card mx-auto">
                <Card.Body className="row">
                        <Row>
                    {
                            this.props.systems.map(system => <div key={uuid('lwiedug')} className="col-md-6 col-lg-4 ml-8"><System key={system._id} {...system} setIframe={this.props.setIframe}/></div>)
                    }
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}