import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'

const Home = () => {
    const [courses, setCourses] = useState([])
    const [q] = useSearchParams()

    useEffect(() => {
        const loadCourses = async () => {
            const res = await fetch("/courses.json")
            let data = await res.json()

            const cateId = q.get("category_id")
            if (cateId != null)
                data = data.filter(d => d.category_id === parseInt(cateId))

            const kw = q.get("kw")
            if (kw != null)
                data = data.filter(d => d.subject.indexOf(kw) >= 0)

            setCourses(data)
        }

        loadCourses()
    }, [q])

    return (
        <>
            <h1 className="text-center text-danger">DANH MUC KHOA HOC</h1>
            <Row>
                {courses.map(c => <Item obj={c}  />)}
            </Row>
        </>
      
    )
}

const Item = (props) => {
    const url = `/courses/${props.obj.id}/lessons`
    return (
        <Col md={4}>
            <Card>
                <Card.Img variant="top" fluid="true" src={props.obj.image} />
                <Card.Body>
                    <Card.Text>{props.obj.subject}</Card.Text>
                    <Link to={url} className="btn btn-info">Cac bai hoc</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Home