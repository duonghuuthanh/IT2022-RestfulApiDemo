import axios from "axios";
import cookies from 'react-cookies'

export const endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': (courseId) => `/courses/${courseId}/lessons/`,
    'lesson-detail': (lessonId) => `/lessons/${lessonId}/`,
    'login': '/o/token/',
    'current_user': '/users/current-user/',
    'like-lesson': (lessonId) => `/lessons/${lessonId}/like/`,
    'rate-lesson': (lessonId) => `/lessons/${lessonId}/rating/`,
    'lesson-comments': (lessonId) => `/lessons/${lessonId}/comments/`,
    'comments': '/comments/',
    'users': '/users/'
}

export const authAxios = () => axios.create({
    baseURL: 'https://thanhduong.pythonanywhere.com/',
    headers: {
        'Authorization': `Bearer ${cookies.load('access_token')}`
    }
})

export default axios.create({
    baseURL: 'https://thanhduong.pythonanywhere.com/'
}) 