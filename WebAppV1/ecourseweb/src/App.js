import React, { useReducer, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Lesson from './components/Lesson';
import LessonDetail from './components/LessonDetail';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './layout/Footer';
import Login from './components/Login';
import myReducer from './reducers/UserReducer';

export const UserContext = createContext()

function App() {
  const [user, dispatch] = useReducer(myReducer)

  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, dispatch]}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses/:courseId/lessons" element={<Lesson />} />
          <Route path="/lessons/:lessonId" element={<LessonDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
