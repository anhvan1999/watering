export const actionTypes = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    NEW_TOKEN: 'NEW_TOKEN'
};

export function loginUser(username, token) {
    return {
        type: actionTypes.LOGIN_USER,
        username, token
    };
}

export function logoutUser() {
    return {
        type: actionTypes.LOGOUT_USER
    }
}

export function getNewToken(newToken) {
    return {
        type: actionTypes.NEW_TOKEN,
        newToken
    }
}
