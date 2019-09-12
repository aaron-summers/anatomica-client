import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Row className="index-title">
            <div>
              <div className="card-title h5">
                <p className="index-text card-title">ANATOMICA</p>
              </div>
              <h5 className="sub-text float-right">Learn in 3D</h5>
            </div>
          </Row>
        </div>
        <div>
          <Row className="float-left">
            <div>
              <Col className="index-columns">
                <Card>
                  <Card.Body>
                    <iframe
                      className="index-model"
                      frameBorder="0"
                      allowFullScreen="true"
                      src="https://human.biodigital.com/widget/?be=35n8&ui-info=false&ui-fullscreen=false&ui-zoom=false&ui-center=false&ui-camera-mode=false&ui-share=false&dk=57cb60ec087456d8919e23b53e025cce2c37aa49"
                    ></iframe>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="index-columns">
                <Card>
                  <Card.Body>
                    <iframe
                      className="index-model"
                      frameBorder="0"
                      allowFullScreen="true"
                      src="https://human.biodigital.com/widget/?be=35n6&ui-info=false&ui-fullscreen=false&ui-zoom=false&ui-center=false&ui-camera-mode=false&ui-share=false&dk=57cb60ec087456d8919e23b53e025cce2c37aa49"
                    ></iframe>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          </Row>
        </div>
        <div>
          <Row className="float-right">
            <div>
              <Col className="index-columns">
                <Card className="index-body-model">
                  <Card.Body>
                    <iframe
                      className="embedded-body-model"
                      frameBorder="0"
                      allowFullScreen="true"
                      src="https://human.biodigital.com/widget/?be=35fa&ui-info=false&ui-fullscreen=false&ui-zoom=false&ui-center=false&ui-camera-mode=false&ui-share=false&load-rotate=10&dk=57cb60ec087456d8919e23b53e025cce2c37aa49"
                    ></iframe>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

//embedded-index-human
