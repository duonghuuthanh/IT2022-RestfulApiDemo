import React from 'react';
import { Link } from "react-router-dom"

function Header() {
    return (
        <>
            <Link to="/">Trang chu</Link>
            <Link to="/courses/1/lessons">Cong nghe phan mem</Link>
        </>
    )
}

export default Header