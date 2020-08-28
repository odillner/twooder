import loginService from '../services/login'
import userService from '../services/users'

import {info, error} from './notification'
import {setTwoods} from './twoods'

const sessionReducer = (state = null, action) => {
    switch (action.type) {
    case 'INIT': {
        return action.data
    }
    case 'RESET': {
        return null
    }
    default: return state
    }
}

export const initSession = (username, password) => {
    return async dispatch => {
        if (username && password) {
            /* manual login */
            const user = {username, password}

            try {
                const res = await loginService.auth(user)

                window.localStorage.setItem('id', res.user.id)
                window.localStorage.setItem('token', res.token)

                dispatch({
                    type: 'INIT',
                    data: res
                })

                dispatch(setTwoods(res.user.id))
                dispatch(info('Successfully logged in', 5))
            } catch (err) {
                dispatch(error('Failed to log in, password or username incorrect', 5))
            }
        } else {
            /*continue session through localstorage*/
            const id = window.localStorage.getItem('id')
            const token = window.localStorage.getItem('token')

            if (id && token) {
                try {
                    const user = await userService.getById(id)

                    dispatch({
                        type: 'INIT',
                        data: {
                            user,
                            token
                        }
                    })

                    dispatch(setTwoods(id))
                } catch (err) {
                    window.localStorage.removeItem('id')
                    window.localStorage.removeItem('token')

                    dispatch({
                        type: 'RESET'
                    })
                }
            }
        }

    }
}

export const endSession = () => {
    return async dispatch => {
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('token')

        dispatch(info('Successfully logged out', 5))

        dispatch({
            type: 'RESET'
        })
    }
}

export default sessionReducer