import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notification'
import sessionReducer from './reducers/session'
import windowReducer from './reducers/windows'
import twoodReducer from './reducers/twoods'

const reducer = combineReducers({
    notification: notificationReducer,
    session: sessionReducer,
    windows: windowReducer,
    twoods: twoodReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store