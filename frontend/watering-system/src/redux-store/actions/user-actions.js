export const actionTypes = {
    SET_USERNAME: 'SET_USERNAME'
};

export function setUsername(username) {
    return {
        type: actionTypes.SET_USERNAME,
        username
    };
}
