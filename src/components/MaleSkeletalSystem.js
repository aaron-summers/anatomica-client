import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default class MaleSkeltalSystem extends React.Component {
    render() {
        return (
            <Card className="male-skeleton-card mx-auto">
                <Card.Body>
                    <iframe
                        id="embedded-human"
                        className="male-skeleton"
                        frameBorder="0"
                        allowFullScreen="true"
                        src="https://human.biodigital.com/widget/?be=35TP&ui-info=true&ui-zoom=true&ui-share=false&dk=57cb60ec087456d8919e23b53e025cce2c37aa49">
                    </iframe>
                </Card.Body>
            </Card>
        )
    }
}