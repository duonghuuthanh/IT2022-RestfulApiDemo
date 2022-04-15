import axios from 'axios'

export const endpoints = {
    "categories": "/categories/"
}

export default axios.create({
    baseURL: "http://thanhduong.pythonanywhere.com"
})