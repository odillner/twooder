import _ from 'lodash'

const initialState = {
    current: 0,
    last: 0,
    storageChecked: false,
    items: []
}

const windowReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_WINDOW': {
        const newItem = action.data
        /* checks if identical window already exists */
        const foundItem = state.items.find(item => item.type === newItem.type)

        if (foundItem) {
            if (_.isEqual(foundItem.initialState, newItem.initialState)) {
                return state
            }
        }

        const newState = {
            current: newItem.id,
            last: newItem.id,
            items: state.items.concat(newItem)
        }

        /* prevents localstorage from being overwritten before it has been checked */
        if (state.storageChecked) {
            window.localStorage.setItem('windows', JSON.stringify(newState))
        }

        return newState
    }
    case 'CLOSE_WINDOW': {
        const newState = {
            ...state,
            items: state.items.filter(item => item.id !== action.data)
        }

        if (state.storageChecked) {
            window.localStorage.setItem('windows', JSON.stringify(newState))
        }
        return newState
    }
    case 'UPDATE_WINDOW': {
        const newItem = action.data
        const newState = {
            ...state,
            items: state.items.map(item => (item.id === newItem.id) ? newItem : item)
        }

        if (state.storageChecked) {
            window.localStorage.setItem('windows', JSON.stringify(newState))
        }
        return newState
    }
    case 'SET_CURRENT_WINDOW': {
        const newState = {
            ...state,
            current: action.data,
        }
        return newState
    }
    case 'RESET_CURRENT_WINDOW': {
        const newState = {
            ...state,
            current: null,
        }
        return newState
    }
    case 'INIT_WINDOWS': {
        const newState = {
            ...state,
            storageChecked: true
        }

        return newState
    }
    case 'RESET_WINDOWS': {
        return []
    }
    default: return state
    }
}

export const initWindows = () => {
    const initialState = JSON.parse(window.localStorage.getItem('windows'))

    return dispatch => {
        if (initialState) {
            if (initialState.items) {
                initialState.items.map(item => {
                    return (
                        dispatch ({
                            type: 'ADD_WINDOW',
                            data: item
                        })
                    )
                })
            }
        }

        dispatch ({type: 'INIT_WINDOWS'})
    }
}

export const addWindow = (type, initialState, x, y) => {
    const newWindow = {
        type,
        initialState,
        x: (x) ? x : 0,
        y: (y) ? y : 0,
        id: Math.floor(Math.random()*10000)
    }
    return {
        type: 'ADD_WINDOW',
        data: newWindow
    }
}

export const updateWindowPosition = (item, x, y) => {
    const newWindow = {
        ...item,
        x,
        y,
    }
    return {
        type: 'UPDATE_WINDOW',
        data: newWindow
    }
}


export const closeWindow = (id) => {
    return {
        type: 'CLOSE_WINDOW',
        data: id
    }
}

export const selectWindow = (id) => {
    return {
        type: 'SET_CURRENT_WINDOW',
        data: id
    }
}

export const resetSelected = () => {
    return {
        type: 'RESET_CURRENT_WINDOW',
    }
}

export default windowReducer