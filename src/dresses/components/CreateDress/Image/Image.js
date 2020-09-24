import React, { Fragment } from 'react';
import { Row,Image, Col } from 'react-bootstrap';
import "./Image.css";

const Imager = (props) => {
    return (
        <Fragment>
            <Col className="image__choice" onClick={props.clicked} xs={3}>
                <Image className="d-block w-100"  value={props.uri} src={props.uri} alt={props.name} thumbnail/>
                    <p>{props.name}</p>
                    <p>Rs. {props.price}</p>
            </Col>
        </Fragment>
    );
};

export default Imager;