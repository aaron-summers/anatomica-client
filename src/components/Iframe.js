import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';


export default class Iframe extends React.Component {

    // state = {
    //     system: {
    //         title: "",
    //         male_url: "",
    //         male_imgurl: "",
    //         female_url: "",
    //         female_imgurl: ""
    //     }
    // }

    handleBack = () => {
        this.props.clearFrame()
    }

    render() {
        const { title, male_url, female_url } = this.props
        return ( 
            this.props.title 
            ? 
            <div>
                <iframe id="embedded-human"
                    allowFullScreen={true}
                    className={`system-iframe`}
                    src={male_url}>
                    </iframe>
                <hr />
                <Button as={Link} to="/explore/systems" variant="outline-dark" onClick={() => this.handleBack()}>Back</Button> </div>
            : <> </>
        )
    }
}