import React, { useState, useEffect } from 'react'
import { Container, Col, Badge, Spinner, Row, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'

const LessonDetail = () => {
    const [lesson, setLesson] = useState(null)
    const { lessonId } = useParams()

    useEffect(() => {
        const loadLesson = async () => {
            const res = await Api.get(endpoints['lesson-detail'](lessonId))
            setLesson(res.data)
        }

        loadLesson()
    }, [])

    if (lesson === null)
        return <Container><Spinner animation="grow" /></Container>

    return (
        <Container>
            <h1 className="text-center text-info">CHI TIET BAI HOC ({lessonId})</h1>
            <Row>
                <Col md={5} xs={12}>
                    <Image src={lesson.image} fluid />
                </Col>
                <Col md={7} xs={12}>
                    <h2>{lesson.subject}</h2>
                    {lesson.tags.map(t => <Badge key={t.id} bg="info">{t.name}</Badge>)}
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