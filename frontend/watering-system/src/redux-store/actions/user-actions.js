export const actionTypes = {
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER'
};

export function loginUser(username, token, refreshToken) {
    return {
        type: actionTypes.LOGIN_USER,
        username, token, refreshToken
    };
}

export function logoutUser() {
    return {
        type: actionTypes.LOGOUT_USER
    }
}
