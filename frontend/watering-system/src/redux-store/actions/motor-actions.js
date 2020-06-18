export const actionTypes = {
    TAKE_DATA_MOTOR:"TAKE_DATA_MOTOR"
}

export function takeDataMotor(data) {
    return {
        type: actionTypes.TAKE_DATA_MOTOR,
        data
    }
}