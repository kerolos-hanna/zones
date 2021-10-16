import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

import loginReducer from './reducer/loginReducer'
import zonesReducer from './reducer/zonesReducer'

const rootReducer = combineReducers({
    login: loginReducer,
    zones: zonesReducer
})
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type State = ReturnType<typeof rootReducer>