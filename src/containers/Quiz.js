import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Question from '../components/Question';

export default class Quiz extends React.Component {

    state = {
        allQuestions: [],
        currentQuestion: undefined,
        answeredQuestions: [],
        questionAnswered: false,
        isCorrect: null,
        score: 0
    }

    setQuestion = (questions) => {
        this.state.allQuestions.map(question => {
            if (!this.state.answeredQuestions.includes(question) && !this.state.currentQuestion) {
                this.setState({ currentQuestion: question })
            }
        })
    } 

    clearCurrentQuestion = () => {
        if (this.state.allQuestions.length > 0) {
            this.setQuestion(this.state.allQuestions)
        }
    }

    setUserQuestions = (question) => {
        if (!this.state.answeredQuestions.includes(question)) {
            this.setState({ answeredQuestions: [...this.state.answeredQuestions, question] })
        }
    }

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

    componentDidMount() {
        this.setState({allQuestions: this.props.questions})
    }

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

    render() {
        return (
            <div>
                { !this.state.currentQuestion 
                ? <Button onClick={() => this.setQuestion()} className="card mx-auto begin-btn" variant="outline-dark">
                    Begin
                </Button>
                : !this.state.allQuestions.length ? <div>You're all done.</div>
                : <Question {...this.state.currentQuestion} checkAnswer={this.checkAnswer} nextQuestion={this.nextQuestion} isCorrect={this.state.isCorrect} score={this.state.score}/>
                }
            </div>
        )
    }
}
