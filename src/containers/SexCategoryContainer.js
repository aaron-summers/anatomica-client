import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import uuid from 'uuid'
import SexCategory from '../components/SexCategory'
import MaleSkeletalSystem from '../components/MaleSkeletalSystem';

export default class SexCategoryContainer extends React.Component {

    state = {
        sexCategories: [
            {
            type: "male"
            }, 
            {
            type: "female"
            }
        ]
    }

    render() {
        return (
            <Card className="sex-category-container-card mx-auto">
                <Card.Body className="row">{this.state.sexCategories.map(sexCategory => <SexCategory key={uuid('bweukyfj')} {...sexCategory} /> )}</Card.Body>
            </Card>
        )
    }
}