import { ActionTypes } from '../actions/actionTypes'

export type points = {
    lat: string,
    lng: string
}
export type zone = {
    _id?: string
    label: string,
    color: string,
    points: points[]
}

export interface zoneAction {
    type: string;
    payload: {
        zones: zone[]
    }
}

const initialState: { zones: zone[] } = {
    zones: []
}


const zonesReducer = (state = initialState, action: zoneAction) => {
    switch (action.type) {
        case ActionTypes.ADD_ZONE:
            return {
                ...state,
            }
        case ActionTypes.REMOVE_ZONE:
            return {
                ...state,
            }
        case ActionTypes.UPDATE_ZONE:
            return {
                ...state,
            }
        case ActionTypes.GET_ZONES:
            return {
                ...state,
                zones: action.payload.zones
            }
        default:
            return state;
    }
}

export default zonesReducer