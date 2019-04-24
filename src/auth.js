import { USER_LOGGED_IN } from './type';
import api from './api'

export const loggedin = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const login = credentials => dispatch =>
    api.user.login(credentials).then(user => {
        dispatch(loggedin(user));
    });