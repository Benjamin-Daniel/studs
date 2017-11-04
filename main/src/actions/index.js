import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POSTS = 'CREATE_POSTS';
export const DELETE_POSTS = 'DELETE_POSTS';
export const SELECTED_POST = 'SELECTED_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_SELECTED = 'DELETE_SELECTED';
export const ADD_STUDENT = 'ADD_STUDENT';
export const CLEAR_STUDENT = 'CLEAR_STUDENT';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

// export const FIND_POST = 'FIND_POST';


// eslint-disable-next-line 
const ROOT_URL = 'http://loalhost:3003/api'

export function fetchPosts() {
    const request = axios.get('/api');
    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function createPost(props) {
    const request = axios.post(`/api/add`, props);
    return {
        type: CREATE_POSTS,
        payload: request
    }
}

export function deletePost(id) {
    const request = axios.delete(`/api/${id}`);
    return {
        type: DELETE_POSTS,
        payload: request
    }
}
export function updatePost(id, props) {
    const request = axios.put(`/api/${id}`, props)
    return {
        type: UPDATE_POST,
        payload: request
    }
}
export function selectedStudent(post) {
    return {
        type: SELECTED_POST,
        payload: post
    }
}


export function deleteSelected() {
    const not = null;
    return {
        type: DELETE_SELECTED,
        payload: not
    }
}
export function addStudent() {
    const not = true;
    return {
        type: ADD_STUDENT,
        payload: not
    }
}
export function clearStudent() {
    const not = false;
    return {
        type: CLEAR_STUDENT,
        payload: not
    }
}
export function setMessage(props) {
    return {
        type: SET_MESSAGE,
        payload: props
    }
}
export function setError(props) {
    return {
        type: SET_ERROR,
        payload: props
    }
}
