import axios from '../utils/axios-instance';
import { loginUser, logoutUser, getNewToken } from '../redux-store/actions/user-actions';
import store from '../redux-store/store';

/**
 * Expire time
 */
const jwtTimeout = 1 * 3500 * 1000;
const jwtRefreshTimeout = 7 * 24 * 3600 * 1000 - 60 * 1000;

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {function} resolve 
 * @param {function} reject 
 */
export function usernamePasswordLogin(username, password, resolve, reject) {
    axios.post('/auth/login', {
        username, password
    }).then(res => {
        // Save info to session storage and local storage
        sessionStorage.setItem("jwtExpireDate", new Date(res.data.issueDate).getTime() + jwtTimeout);
        sessionStorage.setItem("jwtToken", res.data.jwtToken);
        localStorage.setItem("username", username);
        localStorage.setItem("jwtRefreshExpireDate", new Date(res.data.issueDate).getTime() + jwtRefreshTimeout);
        localStorage.setItem("jwtRefreshToken", res.data.jwtRefreshToken);

        // Save to redux
        store.dispatch(loginUser(username, res.data.jwtToken));

        // Login Behavior
        if (resolve) {
            resolve(res);
        }
    }).catch(err => {
        // Reject behavior
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

export function setAuthState() {
    // Get expireDate and refreshExpireDate from storage
    let jwtExpireStr = sessionStorage.getItem('jwtExpireDate');
    let jwtRefreshExpireStr = localStorage.getItem('jwtRefreshExpireDate');

    // Check
    console.log(jwtExpireStr, jwtRefreshExpireStr);

    // If both are null -> logout and return
    if (!jwtExpireStr && !jwtRefreshExpireStr) {
        logout();
        return;
    }

    // Parse to date
    let jwtExpireDate = new Date(Number(jwtExpireStr));
    let jwtRefreshExpireDate = new Date(Number(jwtRefreshExpireStr));
    let now = new Date();

    // Check
    console.log(jwtExpireDate, jwtRefreshExpireDate);

    // If jwt token is valid
    if (jwtExpireStr && jwtExpireDate > now) {
        return;
    }

    // Get new token
    if (jwtRefreshExpireStr && jwtRefreshExpireDate > now) {
        axios.post('/auth/refresh', {
            refreshToken: localStorage.getItem('jwtRefreshToken')
        }).then(res => {
            store.dispatch(getNewToken(res.data.newToken));
            sessionStorage.setItem("jwtToken", res.data.newToken);
            sessionStorage.setItem('jwtExpireDate', new Date(res.data.issueDate) + jwtTimeout);
        }).catch(err => {
            console.log(err);
            logout();
        });
        return;
    }

    // If jwtRefreshtoken is not valid, logout
    logout();
}

setInterval(setAuthState, 60000);
