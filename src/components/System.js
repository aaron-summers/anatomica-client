import React from 'react';
import { Card } from 'react-bootstrap';

export default class System extends React.Component {

    handleClick = (id, title) => {
        console.log(id, title)
    }

    render() {
        const {_id, title, male_url, male_imgurl, female_url, female_imgurl} = this.props
        return (
            <Card className="system-card mx-auto" onClick={() => this.handleClick(_id, title)}>
                <Card.Img className="system-img" variant="top" src={male_imgurl}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                </Card.Body>
            </Card>
        )
    }
}