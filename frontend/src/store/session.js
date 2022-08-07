import { csrfFetch } from "./csrf";

const LOGIN = 'session/login';
const LOGOUT = 'session/logout';

const loginUser = (user) => {
    return {
        type: LOGIN,
        payload: user
    };
}

const logoutUser = () => {
    return {
        type: LOGOUT
    };
}

export const login = user => async dispatch => {
    const { credential, password } = user;

    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({ credential, password })
    });

    const data = await response.json();
    dispatch(loginUser(data.user));
    return response;
}

export const signUp = user => async dispatch => {
    const { username, email, password } = user;

    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    dispatch(loginUser(data.user));
    return response;
}

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', { method: 'DELETE' });
    dispatch(logoutUser());
    return response;
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();

    dispatch(loginUser(data.user));
    return response;
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOGIN:
            newState = {...state};
            newState.user = action.payload;
            return newState;
        case LOGOUT:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;
