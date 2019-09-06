import React from 'react';
import Question from '../components/Question'
// import {Button} from 'react-bootstrap';
 
export default class QuestionsContainer extends React.Component {
    state = {
        currentQuestion: undefined
    }

    // componentDidMount = () => {
    //     this.props.question.map
    // }

    render() {
        const { questions } = this.props
        return (
            <div>
                {questions.map(question => <Question key={question.id} {...question} checkAnswer={this.props.checkAnswer}/>)}
            </div>
        )
    }
}