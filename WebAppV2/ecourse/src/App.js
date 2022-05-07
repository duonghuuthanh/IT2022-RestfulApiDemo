import React, { createContext, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Home from "./components/Home"
import Lesson from "./components/Lesson"
import Login from './components/Login'
import myReducer from './reducers/MyReducer'
import LessonDetail from './components/LessonDetail'
import cookies from 'react-cookies'
import Register from './components/Register'

export const UserContext = createContext()

const App = () => {
  const [user, dispatch] = useReducer(myReducer, cookies.load('current_user'))

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:courseId/lessons" element={<Lesson />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lessons/:lessonId" element={<LessonDetail />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App