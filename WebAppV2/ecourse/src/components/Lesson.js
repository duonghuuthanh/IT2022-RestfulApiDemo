import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Spinner, Row } from 'react-bootstrap'
import Api, { endpoints } from '../configs/Api'
import Item from '../layout/Item'

const Lesson = () => {
    const [lessons, setLessons] = useState([])
    const {courseId} = useParams()

    useEffect(() => {
        const loadLessons = async () => {
            const res = await Api.get(endpoints['lessons'](courseId))
            setLessons(res.data)
        }

        loadLessons()
    }, [])

    return (
        <Container>
            <h1 className="text-center text-info">MY LESSON (COURSE: {courseId})</h1>

            {lessons.length == 0 && <Spinner animation="grow" />}

            <Row>
                {lessons.map(c => <Item obj={c} isLesson={true}  />)}
            </Row>
        </Container>
    )
}

export default Lesson