export const actionTypes = {
    CHANGE_FULLNAME: 'CHANGE_FULLNAME',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
    HISTORY_LIST :'HISTORY_LIST'
};

export function getHistoryList(username){
    return {
        type:actionTypes.HISTORY_LIST,
        username
    };
}