import React from 'react';
import { Route } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Human from '../adapters/HumanAPI';
import SystemsContainer from '../containers/SystemsContainer';
import Iframe from './Iframe'

export default class ExploreContainer extends React.Component {

    state = {
        systems: [],
        system: {
            title: "",
            male_url: "",
            male_imgurl: "",
            female_url: "",
            female_imgurl: ""
        }
    }

    async componentDidMount() {
        await Human.fetchLocalSystems().then(data => this.setState({systems: data}))
        // this.setState({ systems: this.state.allCategories.filter(category => category.content_title.includes("System")) })
        //     systems.push(this.state.allCategories.filter(category => category.content_title.includes("System")))
        //     console.log(systems)
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

    clearFrame = () => {
        this.setState({system: {}})
    }

    setIframe = (id, title, male, male_img, female, female_img) => {
        this.setState({system: {
            title: title,
            male_url: male,
            male_imgurl: male_img,
            female_url: female, 
            female_imgurl: female_img
        }})
    }

    render() {
        return (
            <React.Fragment>
                    <Route path={`${this.props.match.url}`} render={() => <Card className="browse-card mx-auto">
                <Card.Body>
                    {/* <Card as={Link} to={`${this.props.match.url}/systems`} className="browse-options-card mx-auto" onClick={() => this.clearFrame()}><Card.Body><Card.Title>By Systems</Card.Title></Card.Body></Card> */}
                    {/* <Card className="region-card mx-auto"><Card.Body><Card.Title>By Region</Card.Title></Card.Body></Card> */}


                    <Route path={`${this.props.match.url}/systems`} render={(props) => <SystemsContainer systems={this.state.systems} setIframe={this.setIframe} />} />
                    <Route path={`${this.props.match.url}/${this.state.system.title}`} render={(props) => <Iframe {...this.state.system} clearFrame={this.clearFrame} />} />
                </Card.Body>
            </Card> 
                }/>

            </React.Fragment>
        )
    }
}