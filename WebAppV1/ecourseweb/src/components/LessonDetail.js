import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Api, { endpoints, authApi } from '../configs/Api'
import { Container, Spinner, Row, Badge, Col, Image, Button, Form } from 'react-bootstrap'
import { UserContext } from '../App'
import { load } from 'react-cookies'
import Moment from 'react-moment'

const LessonDetail = () => {
    const { lessonId } = useParams()
    const [lesson, setLesson] = useState(null)
    const [liked, setLiked] = useState(false)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState()
    const [user, dispatch] = useContext(UserContext)

    useEffect(() => {
        const loadLessonById = async () => {
            let res;
            if (user !== null) {
                res = await authApi().get((endpoints['lesson-detail'](lessonId)));
            } else {
                res = await Api.get(endpoints['lesson-detail'](lessonId))
            }

            console.info(res.data)
           
            setLesson(res.data)
            setLiked(res.data.like)
        }

        loadLessonById()
    }, [])

    useEffect(() => {
        const loadComments = async () => {
            const res = await Api.get(endpoints['lesson-comments'](lessonId))
            setComments(res.data)
        }

        loadComments()
    }, [comments])

    const like = async () => {
        const res = await authApi().post(endpoints['like-lesson'](lessonId))
        console.info(res)
        if (res.status === 200)
            setLiked(res.data.like)
    }

    const addComment = async (event) => {
        event.preventDefault()
    
        const res = await authApi().post(endpoints['comments'], {
            'content': content,
            'lesson': lessonId,
            'user': 1
        })
        console.info(res.data)
        setComments([...comments, res.data])

    }

    if (lesson === null)
        return <Spinner animation="grow" />
    
    let likeStatus = "outline-primary"
    if (liked === true)
        likeStatus = "primary"

    return (
        <Container>
            <Row>
                <Col md={5} xs={12}>   
                    <Image src={lesson.image} fluid />
                </Col>
                <Col md={7} xs={12}>
                    <h2>{lesson.subject}</h2>
                    {lesson.tags.map(t => <Badge bg="secondary">{t.name}</Badge>)}

                    <div>
                        <Button variant={likeStatus} onClick={like}>Like</Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div dangerouslySetInnerHTML={{__html: lesson.content}}></div>
                </Col>
            </Row>

            <Row>
                <Col>
                
                    <Form onSubmit={addComment}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" value={content} onChange={(evt) => setContent(evt.target.value)} placeholder="Your comment..." />
                        </Form.Group>
                        <Button type="submit" variant="primary">Them binh luan</Button>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col>
                    <ul>
                        {comments.map(c => <li key={c.id}>{c.content} - <Moment fromNow>{c.created_date}</Moment></li>)}
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default LessonDetail