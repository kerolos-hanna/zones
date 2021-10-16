import { ActionTypes } from '../actions/actionTypes'

export interface loginAction {
    type: string,
    payload: {
        token: string;
    }
}

const initialState = {
    token: "",
    isAuthenticated: false
}



const loginReducer = (state = initialState, action: loginAction) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true
            }
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                token: "",
                isAuthenticated: false
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                token: "",
                isAuthenticated: false
            }
        default:
            return state;
    }
}

export default loginReducer