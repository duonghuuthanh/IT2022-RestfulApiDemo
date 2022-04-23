import React, { useState, useEffect } from 'react'
import { Row,  Spinner, Container } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import Item from '../layout/Item'

const Home = () => {
    const [courses, setCourses] = useState([])
    const [q] = useSearchParams()

    useEffect(() => {
        const loadCourses = async () => {
            let query = ""
            const cateId = q.get("category_id")
            if (cateId !== null)
                query = `category_id=${cateId}`

            const kw = q.get("kw")
            if (kw !== null)
                query = `kw=${kw}`

            const res = await Api.get(`${endpoints['courses']}?${query}`)
            setCourses(res.data.results)
            // const res = await fetch("/courses.json")
            // let data = await res.json()

            // const cateId = q.get("category_id")
            // if (cateId != null)
            //     data = data.filter(d => d.category_id === parseInt(cateId))

            // const kw = q.get("kw")
            // if (kw != null)
            //     data = data.filter(d => d.subject.indexOf(kw) >= 0)

            // setCourses(data)
        }

        loadCourses()
    }, [q])

    return (
        <Container>
            <h1 className="text-center text-danger">DANH MUC KHOA HOC</h1>
            {courses.length === 0 && <Spinner animation="grow" />}

            <Row>
                {courses.map(c => <Item obj={c}  />)}
            </Row>
        </Container>
      
    )
}


export default Home