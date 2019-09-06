import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import Question from '../components/Question';
// import QuestionsContainer from './QuestionsContainer';
import Functions from '../Program/Functions';

export default class Quiz extends React.Component {

    state = {
        allQuestions: [],
        currentQuestion: undefined,
        answeredQuestions: [],
        questionAnswered: false,
        isFinished: false,
        score: null
    }

    setQuestion = (questions) => {
        // if (this.state.allQuestions.length > 0) {
            this.state.allQuestions.map(question => {
                if (!this.state.answeredQuestions.includes(question) && !this.state.currentQuestion) {
                    this.setState({ currentQuestion: question })
                }
                // if (this.state.currentQuestion) {
                // this.setUserQuestions()
                // }   
                // this.setState({ allQuestions: this.state.allQuestions.filter(q => q.id !== question.id) })
            })
        // }
    } 

    // setQuestion = (questions) => {
    //     if (!this.state.allQuestions.length <= 0) {
    //         for (let i = 0; i < questions.length; i++) {
    //             if (!this.state.answeredQuestions.includes(questions[i])) {
    //                 this.setState({ currentQuestion: questions[i] })
    //                 this.setUserQuestions(questions[i])
    //                 this.setState({ allQuestions: this.state.allQuestions.filter(q => q.id !== questions[i].id) })
    //             }
    //         }
    //     } 
    // }

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

    checkAnswer = (event, questionId, answer) => {
        console.log(questionId, answer)
        let question = this.state.allQuestions.find(question => question.id === questionId)

        this.state.currentQuestion.answer == answer ? 
        console.log("correct")
        : console.log('wrong')
    }

    componentDidMount() {
        this.setState({allQuestions: this.props.questions})
    }

    nextQuestion = async (isAnswered, questionId) => {
        let question = this.state.allQuestions.find(question => question.id === questionId)
        if (isAnswered === true) {
            console.log('next question')
            await this.setState({ allQuestions: this.state.allQuestions.filter(q => q.id !== questionId), answeredQuestions: [...this.state.answeredQuestions, question] })
            this.setQuestion(this.state.allQuestions)
        }
        this.state.allQuestions.map(q => {
            this.setState({ currentQuestion: q })
        })
    }

    render() {
        return (
            <div>
                { !this.state.currentQuestion ? <Button onClick={() => this.setQuestion()} className="card mx-auto begin-btn" variant="outline-dark">Begin</Button>
                : <Question {...this.state.currentQuestion} checkAnswer={this.checkAnswer} nextQuestion={this.nextQuestion} />
                }
            </div>
        )
    }
}
