import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


// export const apiTodo = axios.create({
//     baseURL: 'http://localhost:3000/academic-api',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// });

export function getRequest(url) {
    return api.get(`/${url}`).then(response => response.data)
}

export function postRequest(url, payload) {
    return api.post(`/${url}`, payload).then(response => response.data)
}