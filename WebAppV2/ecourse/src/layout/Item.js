import React, { memo } from 'react'
import { Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Item = (props) => {
    let url = `/courses/${props.obj.id}/lessons`
    let txt = "Cac bai hoc"
    if (props.isLesson === true) {
        txt = "Chi tiet"
        url = `/lessons/${props.obj.id}`
    }

    return (
        <Col md={4}>
            <Card>
                <Card.Img variant="top" fluid="true" src={props.obj.image} />
                <Card.Body>
                    <Card.Text>{props.obj.subject}</Card.Text>
                    <Link to={url} className="btn btn-info">{txt}</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default memo(Item)