import React from 'react';
import Category from '../components/Category';
import { Card, Button, Col, Row } from 'react-bootstrap';

export default class QuizCategoriesContainer extends React.Component {
    render() {
        const {categories} = this.props
        return (
                <Card className="categories-container mx-auto">
                    <Card.Body className="row">{categories.map(category => <Category key={category.serial} {...category} setQuiz={this.props.setQuiz} />)}</Card.Body>                
            </Card>
        )
    }
}