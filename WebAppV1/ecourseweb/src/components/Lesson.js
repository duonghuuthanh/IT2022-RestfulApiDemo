import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Row } from 'react-bootstrap';
import Api, { endpoints } from '../configs/Api';
import Item from '../layout/Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Lesson() {
    const [lessons, setLessons] = useState([])
    const { courseId } = useParams()

    useEffect(() => {
        const loadLessons = async () => {
            const res = await Api.get(endpoints['lessons'](courseId))
            setLessons(res.data)

            console.info(res.data)
        }

        loadLessons()
    }, [])

    return (
        <Container>
            <h1 className="text-center text-info">MY LESSON (COURSE: {courseId}) </h1>
            
            {lessons.length == 0 && <Spinner animation="grow" />}
            
            <Row>
                {lessons.map(c => {
                    return <Item id={c.id} image={c.image} subject={c.subject} isLesson={true} />
                })}
            </Row>
        </Container>
    )
}

export default Lesson