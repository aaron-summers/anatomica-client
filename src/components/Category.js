import React from 'react';
import {Card, Button} from 'react-bootstrap';
import API from '../adapters/API';
import { Route, Link } from 'react-router-dom';

export default class Category extends React.Component {

    handleClick = (category_id) => {
        this.props.setQuiz(category_id)
    }

    render() {
        const {id, serial, system, questions} = this.props
        return (
            <div>
                <Route path={"/select"} component={(props) => <Card className="card-container mx-auto" style={{ width: '18rem', cursor: 'pointer' }} >
                    <Card.Body>
                        <Card.Title>{system}</Card.Title>
                        <hr></hr>
                        {/* <Card.Text>{questions.map(q => <small>{q.content}</small>)}</Card.Text> */}
                        <Button as={Link} to={'/quiz'} onClick={() => this.handleClick(id)} variant="outline-primary">Start Quiz</Button>
                    </Card.Body>
                </Card>} />

            </div>
        )
    }
}