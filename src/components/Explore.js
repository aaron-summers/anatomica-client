import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import uuid from 'uuid'
import SexCategory from './SexCategory'
import MaleSkeletalSystem from './MaleSkeletalSystem';
import Human from '../adapters/HumanAPI';
import SystemsContainer from '../containers/SystemsContainer';

export default class ExploreContainer extends React.Component {

    state = {
        systems: []
    }

    async componentDidMount() {
        await Human.fetchLocalSystems().then(data => this.setState({systems: data}))
        // this.setState({ systems: this.state.allCategories.filter(category => category.content_title.includes("System")) })
        // let systems = []
        // // for (let i = 0; i < this.state.allCategories.length; i++) {
        //     systems.push(this.state.allCategories.filter(category => category.content_title.includes("System")))
        //     console.log(systems)
            // if (this.state.allCategories[i].content_title.includes("System"))
        // }
    }

    // getSystems = () => {
    //     let systems = []
    //     // for (let i = 0; i < this.state.allCategories.length; i++) {
    //         systems.push(this.state.allCategories.filter(category => category.content_title.includes("System")))
    //         console.log(systems)
    //         return systems
    //     // }
    //     // return systems
    // }

    handleClick = () => {
        this.setState({systems: this.getSystems()})
    }

    render() {
        return (
            <React.Fragment>
                <Route path={`${this.props.match.url}`} render={ () => <Card className="browse-card mx-auto">
                <Card.Body>
                    <Card as={Link} to={`${this.props.match.url}/systems`} className="browse-options-card mx-auto"><Card.Body><Card.Title>By Systems</Card.Title></Card.Body></Card>
                    <Card className="region-card mx-auto"><Card.Body><Card.Title>By Region</Card.Title></Card.Body></Card>
                </Card.Body>
        </Card> }/>

                <Route path={`${this.props.match.url}/systems`} render={(props) => <SystemsContainer systems={this.state.systems} />} />
            </React.Fragment>
        )
    }
}