import React from 'react';
import API from '../adapters/API';
import FormContainer from './FormContainer';
import QuizCategoriesContainer from './QuizCategoriesContainer';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import {Route, Link} from 'react-router-dom';
import Quiz from './Quiz';
import Explore from '../components/Explore';
import Human from '../adapters/HumanAPI';

export default class Main extends React.Component {

    state = {
        user: undefined,
        categories: [],
        isFinished: false,
        quiz: null,
        biodigitalData: []
    }

    componentDidMount = () => {
        API.validateUser()
            .then(user => {
                this.setState({ user })
            })
    }

    signUp = user => {
        API.signUp(user)
            .then(user => this.setState({ user }))
    }

    logIn = (user) => {
        API.logIn(user)
            .then(user => this.setState({ user }))
    }

    logOut = () => {
        API.clearToken()
        this.setState({ user: undefined })
    }

    fetchCategories = () => {
        API.getCategories().then(categories => this.setState({ categories }))
    }

    handleClick = () => {
        this.fetchCategories()
    }

    setQuiz = (category_id) => {
        API.createQuiz(category_id).then(data => this.setState({ quiz: data.quiz }))
    }

    destroyQuiz = (length) => {
        if (!length) {
            this.setState({ quiz: null})
        }
    }

    showScore = (score) => {
        console.log(score)
    }

    clearStates = (length) => {
        if (!length) {
            this.setState({ categories: [] })
        }
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.user ?
                    <div>
                    <Navbar sticky="top" bg="light" variant="primary">
                        <Navbar.Brand href="/">Anatomica</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Item><Nav.Link as={Link} to="/explore/systems" onClick={() => this.clearStates()}>Explore</Nav.Link></Nav.Item>
                            <Nav.Item><Nav.Link as={Link} to={"/select"} onClick={this.handleClick}>Quiz</Nav.Link></Nav.Item>
                            <NavDropdown title="Options" id="dropdown-menu">
                                <div className="dropdown-item"><Button as={Link} to={"/"} className="logout-btn" variant="outline-danger" onClick={() => this.logOut()}>Log Out</Button></div>
                            </NavDropdown>
                        </Nav>
                    </Navbar>
                    <Route path={"/explore"} component={Explore} />
                    {
                        this.state.quiz
                        ? <Route exact path={"/quiz"} component={(props) => <Quiz {...this.state.quiz} destroyQuiz={this.destroyQuiz} clearStates={this.clearStates} isFinished={this.state.isFinished} />} />
                        : this.state.categories.length ? <QuizCategoriesContainer setQuiz={this.setQuiz} categories={this.state.categories}/>
                        : <></>
                    }
                </div> 
                : <>
                    <Route exact path={"/"} component={(props) => <FormContainer user={this.state.user} signUp={this.signUp} logIn={this.logIn} logOut={this.logOut} />} />
                </>
                }
            </div>
        )
    }
}