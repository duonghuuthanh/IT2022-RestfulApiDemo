import React, { memo } from 'react'
import { Col, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Item = (props) => {
    const nav = useNavigate()

    const goToLesson = () => {
        if (props.isLesson === true)
            nav(`/lessons/${props.id}`)
        else
            nav(`/courses/${props.id}/lessons`)
    }

    let btnDetail = "Xem cac bai hoc"
    if (props.isLesson === true)
        btnDetail = "Xem chi tiet"

    return (
        <Col md={4} xs={12}>
            <Card>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.subject}</Card.Title>
                    <Button variant="primary" onClick={goToLesson}>{btnDetail}</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default memo(Item)