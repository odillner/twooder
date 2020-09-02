import twoodService from '../services/twoods'
import {info, error} from '../reducers/notification'

const initialState = []

const twoodReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_TWOOD': {
        if (action.data == []) {
            const newTwoods = action.data.filter(newTwood => {
                const found = state.find(twood => twood.id === newTwood.id)

                if (found) {
                    return false
                } else {
                    return true
                }
            })

            return state.concat(newTwoods)
        } else {
            const newTwood = action.data
            const found = state.find(twood => twood.id === newTwood.id)

            if (found) {
                return state
            } else {
                return state.concat(newTwood)
            }
        }
    }
    case 'REMOVE_TWOOD': {
        return state.filter(item => item.id != action.data)
    }
    case 'UPDATE_TWOOD': {
        const newTwood = action.data
        return state.map(twood => (twood.id === newTwood.id) ? newTwood : twood)
    }
    case 'RESET_TWOODS': {
        return initialState
    }
    default: return state
    }
}

export const addTwood = (twood) => {
    return {
        type: 'ADD_TWOOD',
        data: twood
    }
}

export const likeTwood = (twood, token) => {
    return async dispatch => {
        try {
            const res = await twoodService.like(twood.id, token)

            dispatch({
                type: 'UPDATE_TWOOD',
                data: {
                    ...twood,
                    likes: res.likes
                }
            })

            dispatch(info('Twood successfully liked', 5))
        } catch (err) {
            dispatch(error('Error liking twood', 5))
        }
    }
}

export const replyTwood = (twood, newTwood, token) => {
    return async dispatch => {
        try {
            const res = await twoodService.reply(twood.id, newTwood, token)

            dispatch({
                type: 'ADD_TWOOD',
                data: res
            })

            dispatch({
                type: 'UPDATE_TWOOD',
                data: {
                    ...twood,
                    replies: twood.replies.concat(res)
                }
            })

            dispatch(info('Twood successfully replied to', 5))
        } catch (err) {
            dispatch(error('Error replying to twood', 5))
        }
    }
}

export const removeTwood = (twood, token) => {
    return async dispatch => {
        try {
            await twoodService.remove(twood.id, token)

            dispatch({
                type: 'REMOVE_TWOOD',
                data: twood
            })

            dispatch(info('Twood successfully deleted', 5))
        } catch (err) {
            dispatch(error('Error deleting twood', 5))
        }
    }
}

export default twoodReducer