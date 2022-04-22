import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import { Container, Spinner, Row, Badge, Col, Image } from 'react-bootstrap'

const LessonDetail = () => {
    const { lessonId } = useParams()
    const [lesson, setLesson] = useState(null)

    useEffect(() => {
        const loadLessonById = async () => {
            const res = await Api.get(endpoints['lesson-detail'](lessonId))
            setLesson(res.data)
        }

        loadLessonById()
    }, [])

    if (lesson === null)
        return <Spinner animation="grow" />
    

    return (
        <Container>
            <Row>
                <Col md={5} xs={12}>   
                    <Image src={lesson.image} fluid />
                </Col>
                <Col md={7} xs={12}>
                    <h2>{lesson.subject}</h2>
                    {lesson.tags.map(t => <Badge bg="secondary">{t.name}</Badge>)}
                </Col>
            </Row>
            <Row>
                <Col>
                    <div dangerouslySetInnerHTML={{__html: lesson.content}}></div>
                </Col>
            </Row>
        </Container>
    )
}

export default LessonDetail