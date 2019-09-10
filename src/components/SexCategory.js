import React from 'react';
import { Card, Button} from 'react-bootstrap';
import { Route, Link, Switch } from 'react-router-dom';
import MaleSkeletalSystem from './MaleSkeletalSystem';

export default class SexCategory extends React.Component {

    render() {
        const { type } = this.props
        return (
            <Card className="sex-category-card mx-auto" variant="light">
                <Card.Body>
                    {
                        type == "male"
                        ? <Link to="/male"><Card.Title>{type}</Card.Title></Link>
                        : <Link to="/female"><Card.Title>{type}</Card.Title></Link>
                    }
                    <hr></hr>
                </Card.Body>
            </Card>
        )
    }
}
