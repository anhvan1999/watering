export const actionTypes = {
    TAKE_DATA_SENSOR:"TAKE_DATA_SENSOR"
}

export function takeDataSensor(data) {
    return {
        type: actionTypes.TAKE_DATA_SENSOR,
        data
    }
}