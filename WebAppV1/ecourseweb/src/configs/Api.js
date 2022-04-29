import axios from 'axios'
import cookies from 'react-cookies'

export const endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (courseId) => `/courses/${courseId}/lessons/`,
    "lesson-detail": (lessonId) => `/lessons/${lessonId}/`,
    "login": "/o/token/",
    "current-user": "/users/current-user/",
    "like-lesson": (lessonId) => `/lessons/${lessonId}/like/`,
    "lesson-comments": (lessonId) => `/lessons/${lessonId}/comments/`,
    "comments": "/comments/"
}

export const authApi = () => {
    return axios.create({
        baseURL: "https://thanhduong.pythonanywhere.com",
        headers: {
            'Authorization': `Bearer ${cookies.load('token')}`
        }
    })
}

export default axios.create({
    baseURL: "https://thanhduong.pythonanywhere.com"
})