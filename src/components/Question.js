import React from 'react';
import {Card, Button} from 'react-bootstrap';
import Functions from '../Program/Functions';
import uuid from 'uuid';


export default class Question extends React.Component {
    state = {
        answers: [],
        isAnswered: false
    }

    setAnswers = () => {
        let answer = []
        answer.push(this.props.answer)
        let allAnswers = [...answer, ...this.props.altAnswers]
        this.setState({answers: Functions.shuffle(allAnswers)})
    }

    setChecked = (event) => {
        console.log(event.target.name)
        this.setState({checked: event.target.name})
    }

    componentDidMount = () => {
        this.setAnswers()    
    }

    handleAnswer = (event, questionId, answer) => {
        this.setState({isAnswered: !this.state.isAnswered})
        this.props.checkAnswer(event, questionId, answer)
    }

    setNextQuestion = async (questionId) => {
        await this.props.nextQuestion(this.state.isAnswered, questionId)
        this.setAnswers()
        this.setState({isAnswered: !this.state.isAnswered})
    }

    render() {
        const {id, content, altAnswers, answer, isAnswered} = this.props
        return (
            <div>
                <Card className="question-card mx-auto">
                    <Card.Body>
                        <Card.Title>
                            {content}
                        </Card.Title>
                            {this.state.answers.map(answer =>
                                <Button key={uuid('iewugfqeuf')} className="card btn answer-card mx-auto" variant="outline-dark" onClick={(e) => this.handleAnswer(e, id, answer)}>
                                    <div className="answer-text">{answer}</div>
                            </Button>
                            )
                        }
                        {this.state.isAnswered ? <Button onClick={() => this.setNextQuestion(id)} variant="outline-dark">Next</Button> : <></>}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}