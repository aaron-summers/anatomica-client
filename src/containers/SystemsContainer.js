import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import uuid from 'uuid'
import SexCategory from '../components/SexCategory'
import MaleSkeletalSystem from '../components/MaleSkeletalSystem';
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
                    {
                        this.props.systems.map(system => <System key={system._id} {...system}/>)
                    }
                </Card.Body>
            </Card>
        )
    }
}