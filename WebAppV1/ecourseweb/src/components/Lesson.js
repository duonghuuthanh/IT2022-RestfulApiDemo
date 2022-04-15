import React from 'react';
import { useParams } from 'react-router-dom';

function Lesson() {
    const { courseId } = useParams()

    return (
        <>
            <h1>MY LESSON ({courseId})</h1>
        </>
    )
}

export default Lesson