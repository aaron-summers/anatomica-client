import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Question from '../components/Question';
import { Route, Link } from 'react-router-dom';

export default class Quiz extends React.Component {

    state = {
        allQuestions: [],
        currentQuestion: undefined,
        answeredQuestions: [],
        questionAnswered: false,
        isCorrect: null,
        score: 0
    }

    //sets current question
    setQuestion = (questions) => {
        this.state.allQuestions.map(question => {
            if (!this.state.answeredQuestions.includes(question) && !this.state.currentQuestion) {
                this.setState({ currentQuestion: question })
            }
        })
    } 

    //check current question's answer and change isCorrect state and update score accordingly
    checkAnswer = (userAnswer, questionId, answer) => {
        console.log(questionId, answer, userAnswer)
        let question = this.state.allQuestions.find(question => question.id === questionId)

        this.state.currentQuestion.answer == answer 
        ? this.setState({ isCorrect: true })
        : this.setState({ isCorrect: false })

        if (userAnswer == answer) { 
            this.setState({score: this.state.score + 20})
        }
    }

    //load all questions
    componentDidMount() {
        this.setState({allQuestions: this.props.questions})
    }

    //set next question during quiz session and nullify isCorrect state for it
    nextQuestion = async (isAnswered, questionId) => {
        let question = this.state.allQuestions.find(question => question.id === questionId)
        if (isAnswered === true) {
            console.log('next question')
            await this.setState({ allQuestions: this.state.allQuestions.filter(q => q.id !== questionId), 
                answeredQuestions: [...this.state.answeredQuestions, question] })
            this.setQuestion(this.state.allQuestions)
        }
        this.state.allQuestions.map(q => {
            this.setState({ currentQuestion: q })
        })
        this.setState({isCorrect: null})
    }

    //call to end current quiz
    handleFinish = () => {
        if (!this.state.allQuestions.length) {
            this.props.destroyQuiz(this.state.allQuestions.length)
            this.props.clearStates(this.state.allQuestions.length)
        }
    }

    render() {
        return (
            <div>
                { !this.state.currentQuestion 
                ? <div className="begin-container"><Button onClick={() => this.setQuestion()} className="card mx-auto begin-btn" variant="outline-dark">
                    <div className="begin-text">Start</div>
                </Button> </div>
                    : !this.state.allQuestions.length 
                    ? <div> 
                        <Card className="finished-card mx-auto">
                            <Card.Title>You're all done.</Card.Title>
                            <Card.Text>Score: {this.state.score}</Card.Text>
                            <Button as={Link} to={"/"} onClick={() => this.handleFinish()} variant="outline-dark">Finish</Button></Card>
                    </div>
                : <Question {...this.state.currentQuestion} checkAnswer={this.checkAnswer} nextQuestion={this.nextQuestion} isCorrect={this.state.isCorrect} score={this.state.score}/>
                }
            </div>
        )
    }
}
