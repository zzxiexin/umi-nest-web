import { post, get } from './request';
export function login (params: unknown){
    return post('/login', params)
}

export function profile (params?: unknown){
    return get('/profile')
}

export function getAllUsers(){
    return get('/users/allUsers')
}

export function insertUser(params: any){
    return post('/users/insert', params)
}

export function deleteUser(params: any){
    return post('/users/delete', params)
}

