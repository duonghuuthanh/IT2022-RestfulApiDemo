import React, { useState, useEffect } from 'react';
import { Container, Row,  Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Api, { endpoints } from '../configs/Api';
import Item from '../layout/Item';

function Home() {
    const [courses, setCourses] = useState([])
    const [q] = useSearchParams()

    useEffect(() => {
        const loadCourses = async () => {
            let query = ""

            let cateId = q.get("category_id")
            if (cateId !== null)
                query += `category_id=${cateId}`

            let kw = q.get("kw")
            if (kw !== null)
                if (query === "")
                    query += `kw=${kw}`
                else
                    query += `&kw=${kw}`  

            const res = await Api.get(`${endpoints['courses']}?${query}`)
            setCourses(res.data.results)
        }

        loadCourses()
    }, [q])

    return (
        <Container>
            <h1 className="text-center text-danger">DANH MUC KHOA HOC</h1>
            
            {courses.length == 0 && <Spinner animation="grow" />}
            
            <Row>
                {courses.map(c => {
                    return <Item id={c.id} image={c.image} subject={c.subject} />
                })}
            </Row>
        </Container>   
    )
}

export default Home