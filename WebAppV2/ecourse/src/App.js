import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Home from "./components/Home"
import Lesson from "./components/Lesson"

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId/lessons" element={<Lesson />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App