import twoodService from '../services/twoods'
import {info, error} from './notification'

const twoodReducer = (state = [], action) => {
    switch (action.type) {
    case 'NEW_TWOOD': {
        return state.concat(action.data)
    }
    case 'DELETE_TWOOD': {
        const deletedTwood = action.data

        return state.filter(anecdote => anecdote.id != deletedTwood.id)
    }
    case 'UPDATE_TWOOD': {
        const newTwood = action.data
        const id = newTwood.id

        return state.map(twood =>
            twood.id !== id ? twood : newTwood
        )
    }
    case 'GET_TWOODS': {
        const user = action.data
        return state.map(twood =>
            twood.id == user ? twood : null
        )
    }
    case 'INIT_TWOODS': {
        return action.data
    }
    default: return state
    }
}

export const createTwood = (twood, token) => {
    return async dispatch => {
        try {
            const res = await twoodService.create(twood, token)

            dispatch({
                type: 'NEW_TWOOD',
                data: res
            })

            dispatch(info('Twood successfully created', 5))
        } catch (err) {
            dispatch(error('Error creating twood', 5))
        }
    }
}

export const likeTwood = (twood, token) => {
    return async dispatch => {
        const newTwood = {
            ...twood,
            likes: twood.likes + 1
        }

        try {
            const res = await twoodService.update(newTwood.id, newTwood, token)

            dispatch({
                type: 'UPDATE_TWOOD',
                data: res
            })

            dispatch(info('Twood successfully liked', 5))
        } catch (err) {
            dispatch(error('Error liking twood', 5))
        }
    }
}

export const deleteTwood = (twood, token) => {
    return async dispatch => {
        try {
            await twoodService.remove(twood.id, token)

            dispatch({
                type: 'DELETE_TWOOD',
                data: twood
            })

            dispatch(info('Twood successfully deleted', 5))
        } catch (err) {
            dispatch(error('Error deleting twood', 5))
        }
    }
}


export const setTwoods = (twoods) => {
    return ({
        type: 'INIT_TWOODS',
        data: twoods
    })
}

export const setTwoodsByUser = (userId) => {
    return async dispatch => {
        try {
            const res = await twoodService.getByUser(userId)

            dispatch({
                type: 'INIT_TWOODS',
                data: res
            })
        } catch (err) {
            dispatch(error('Error fetching twoods', 5))
        }
    }
}

export const setAllTwoods = () => {
    return async dispatch => {
        try {
            const res = await twoodService.getAll()

            dispatch({
                type: 'INIT_TWOODS',
                data: res
            })
        } catch (err) {
            dispatch(error('Error fetching twoods', 5))
        }
    }
}



export default twoodReducer