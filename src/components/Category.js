import React from 'react';
import {Card, Button } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';

export default class Category extends React.Component {

    handleClick = (category_id) => {
        this.props.setQuiz(category_id)
    }

    render() {
        const {id, system} = this.props
        return (
            <Route path={"/select"} component={(props) => <div className="col-sm-6"> <Card className="category-card mx-auto" >
                    <Card.Body>
                        <Card.Title>{system}</Card.Title>
                        <hr></hr>
                        <Button as={Link} to={'/quiz'} onClick={() => this.handleClick(id)} variant="outline-dark">Start Quiz</Button>
                    </Card.Body>
                </Card>
            </div>
                } />
        )
    }
}