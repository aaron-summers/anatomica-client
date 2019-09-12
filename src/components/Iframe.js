import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Iframe extends React.Component {
  state = {
    isToggled: "male"
  };

  handleBack = () => {
    this.props.clearFrame();
  };

  handleMale = (event) => {
      if (this.state.isToggled == "female") {
        this.setState({isToggled: "male"})        
      } return;
  }

  handleFemale = (event) => {
      if (this.state.isToggled == "male") {
          this.setState({isToggled: "female"})
      } return;
  } 

  render() {
    const { title, male_url, female_url } = this.props;
    return this.props.title ? (
      <div>
        <div className="d-flex flex-column">
          <ButtonGroup size="lg">
            <Button active={this.state.isToggled == "male"} onClick={(event) => this.handleMale(event)} variant="outline-dark">Male</Button>
            <Button active={this.state.isToggled == "female"} onClick={(event) => this.handleFemale(event)} variant="outline-dark">Female</Button>
          </ButtonGroup>
        </div>
        {this.state.isToggled == "male" ? (
          <iframe
            id="embedded-human"
            title={`${title}`}
            allowFullScreen={true}
            className={`system-iframe`}
            src={male_url}
          ></iframe>
        ) : (
          <iframe
            id="embedded-human"
            title={`${title}`}
            allowFullScreen={true}
            className={`system-iframe`}
            src={female_url}
          ></iframe>
        )}

        <hr />
        <Button
          as={Link}
          to="/explore/systems"
          variant="outline-dark"
          onClick={() => this.handleBack()}
        >
          Back
        </Button>
      </div>
    ) : (
      <> </>
    );
  }
}
