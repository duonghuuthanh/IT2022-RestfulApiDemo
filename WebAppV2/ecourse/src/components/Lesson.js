import React from 'react'
import { useParams } from 'react-router-dom'

const Lesson = () => {
    const {courseId} = useParams()

    return (
        <>
            <h1>MY LESSON ({courseId})</h1>
        </>
    )
}

export default Lesson