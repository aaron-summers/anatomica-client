import React from 'react';
import {Card, Button, Row, Col} from 'react-bootstrap';
import API from '../adapters/API';
import { Route, Link } from 'react-router-dom';

export default class Category extends React.Component {

    handleClick = (category_id) => {
        this.props.setQuiz(category_id)
    }

    render() {
        const {id, serial, system, questions} = this.props
        return (
            <Route path={"/select"} component={(props) => <div className="col-sm-6"> <Card className="category-card mx-auto" >
                    <Card.Body>
                        <Card.Title>{system}</Card.Title>
                        <hr></hr>
                        <Button as={Link} to={'/quiz'} onClick={() => this.handleClick(id)} variant="outline-primary">Start Quiz</Button>
                    </Card.Body>
                </Card>
            </div>
                } />
        )
    }
}