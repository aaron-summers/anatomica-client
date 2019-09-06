import React from 'react';
import API from '../adapters/API';
import FormContainer from './FormContainer';
import CategoriesContainer from './CategoriesContainer';
import { Navbar, Nav, Button } from 'react-bootstrap';
import {Route, Link} from 'react-router-dom';
import Quiz from './Quiz';

export default class Main extends React.Component {

    state = {
        user: undefined,
        categories: [],
        quiz: null,
    }

    componentDidMount() {
        API.validateUser()
            .then(user => {
                this.setState({ user })
            })
    }

    signUp = user => {
        API.signUp(user)
            .then(user => this.setState({ user }))
    }

    logIn = user => {
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

    render() {
        return (
            <div className="App">
                {
                    this.state.user ? 
                    <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="/">Anatomica</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link  as={Link} to={"/select"} onClick={this.handleClick}>Quiz</Nav.Link>
                            <Button as={Link} to={"/"} variant="outline-danger" onClick={this.logOut}>Log Out</Button>
                        </Nav>
                    </Navbar>
                    {
                        this.state.quiz
                        ? <Route exact path={"/quiz"} component={(props) => <Quiz {...this.state.quiz}/>} />
                        : <CategoriesContainer setQuiz={this.setQuiz} categories={this.state.categories}/> 
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