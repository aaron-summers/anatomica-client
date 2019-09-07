import React from 'react';
import {Card, Button, ProgressBar} from 'react-bootstrap';
import uuid from 'uuid';
import _ from 'lodash';


export default class Question extends React.Component {
    state = {
        answers: [],
        isAnswered: false,
        cardFade: false,
        progress: 0
    }

    setAnswers = () => {
        let answer = []
        answer.push(this.props.answer)
        let allAnswers = [...answer, ...this.props.altAnswers]
        this.setState({answers: _.shuffle(allAnswers)})
    }

    componentDidMount = () => {
        this.setAnswers()
    }

    handleAnswer = (event, questionId, answer) => {
        this.setState({isAnswered: !this.state.isAnswered})
        this.props.checkAnswer(event.target.innerText, questionId, answer)
        this.setState({progress: this.state.progress + 20})
    }

    setNextQuestion = async (questionId) => {
        await this.props.nextQuestion(this.state.isAnswered, questionId)
        this.setAnswers()
        this.setState({isAnswered: !this.state.isAnswered})  
    }

    render() {
        const {id, content, altAnswers, answer, isAnswered, isCorrect, score} = this.props
        return (
            <div>
                <Card className={"question-card mx-auto"}>
                    <Card.Body>
                        <ProgressBar now={this.state.progress}/>
                        <br/>
                        <Card.Title>
                            {content}
                        </Card.Title>
                        <Card>
                            <Card.Body>Score: {score}</Card.Body>
                        </Card>
                            {
                                this.state.answers.map(ans =>
                                    <Button 
                                    key={uuid('iewugfqeuf')} 
                                        className={this.props.isCorrect == null ? "card answer-card mx-auto"
                                            : (this.props.isCorrect == true) && (ans == answer) ? "card animated tada fast answer-card mx-auto"
                                            : "card animated headShake faster answer-card mx-auto"
                                        } 
                                    variant={ this.props.isCorrect == null 
                                        ? "outline-dark" : (this.props.isCorrect == true) && (ans == answer) ? "success" 
                                        : "outline-danger"} 
                                    onClick={(e) => this.handleAnswer(e, id, answer)} 
                                    disabled={this.state.isAnswered ? true : false}>
                                        {ans}
                                </Button>
                                )
                            }
                        {this.state.isAnswered 
                            ? <div><br/>
                            <Button onClick={() => this.setNextQuestion(id)} variant="outline-dark">Next</Button></div>
                            : <></>}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}