import loginService from '../services/login'
import userService from '../services/users'

import {info, error} from './notification'
import { closeWindow } from './windows'

const initialState = {
    user: null,
    token: null,
    storageChecked: false
}
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'INIT_SESSION': {
        return {
            ...action.data,
            storageChecked: true
        }
    }
    case 'RESET_SESSION': {
        return {
            ...initialState,
            storageChecked: true
        }
    }
    default: return state
    }
}

export const manualSignIn = (username, password, windowId) => {
    return async dispatch => {
        const user = {username, password}

        try {
            const res = await loginService.auth(user)

            window.localStorage.setItem('id', res.user.id)
            window.localStorage.setItem('token', res.token)

            dispatch({
                type: 'INIT_SESSION',
                data: res
            })

            dispatch(closeWindow(windowId))

            dispatch(info('Successfully logged in', 5))
        } catch (err) {
            dispatch(error('Failed to log in, password or username incorrect', 5))
        }
    }
}

export const continueSession = () => {
    return async dispatch => {
        const id = window.localStorage.getItem('id')
        const token = window.localStorage.getItem('token')

        if (id && token) {
            try {
                const user = await userService.getById(id)

                dispatch({
                    type: 'INIT_SESSION',
                    data: {
                        user,
                        token
                    }
                })

            } catch (err) {
                window.localStorage.removeItem('id')
                window.localStorage.removeItem('token')

                dispatch({
                    type: 'RESET_SESSION'
                })
            }
        } else {
            dispatch({
                type: 'RESET_SESSION'
            })
        }
    }
}

export const endSession = () => {
    return async dispatch => {
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('token')

        dispatch(info('Successfully logged out', 5))

        dispatch({
            type: 'RESET_SESSION'
        })
    }
}

export default sessionReducer