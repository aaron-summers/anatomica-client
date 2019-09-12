import React from 'react';
import { Link} from 'react-router-dom'
import { Card } from 'react-bootstrap';

export default class System extends React.Component {

    handleClick = (id, title, male, male_img, female, female_img) => {
        this.props.setIframe(id, title, male, male_img, female, female_img)
    }

    render() {
        let {_id, title, male_url, male_imgurl, female_url, female_imgurl} = this.props
        return (
            <Card className="system-card mx-auto">
                <Card.Body className="container">    
                    <Card as={Link} to={`/explore/${title}`} className="system-img-card" onClick={() => this.handleClick(_id, title, male_url, male_imgurl, female_url, female_imgurl)}>
                        <Card.Body className="system-img-container">
                            <Card.Img className="system-img" variant="top" src={male_imgurl}/>
                        </Card.Body>
                    </Card>
                    <hr />
                    <Card.Title>{title}</Card.Title>
                </Card.Body>
        </Card>
        )
    }
}