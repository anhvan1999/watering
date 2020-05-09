import axios from '../utils/axios-instance';
import {loginUser, logoutUser} from '../redux-store/actions/user-actions';
import store from '../redux-store/store';

export function usernamePasswordLogin(username, password, resolve, reject) {
    axios.post('/auth/login', {
        username, password
    }).then(res => {
        // Save info to session storage and local storage
        sessionStorage.setItem("jwtToken", res.data.jwtToken);
        sessionStorage.setItem("username", username);
        localStorage.setItem("jwtRefreshToken", res.data.jwtRefreshToken);

        // Save to redux
        store.dispatch(loginUser(username, res.data.jwtToken, res.data.jwtRefreshToken));

        if (resolve) {
            resolve(res);
        }
    }).catch(err => {
        if (reject) {
            reject(err);
        }
    });
}

export function logout() {
    // Clear session and local storage
    store.dispatch(logoutUser());
    sessionStorage.clear();
    localStorage.clear();
}