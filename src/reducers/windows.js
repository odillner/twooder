import _ from 'lodash'

const initialState = {
    current: 0,
    last: 0,
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

        window.localStorage.setItem('windows', JSON.stringify(newState))

        return newState
    }
    case 'CLOSE_WINDOW': {
        const newState = {
            ...state,
            items: state.items.filter(item => item.id !== action.data)
        }

        window.localStorage.setItem('windows', JSON.stringify(newState))

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
        return action.data
    }
    case 'RESET_WINDOWS': {
        return []
    }
    default: return state
    }
}

export const initWindows = (initialState) => {
    return {
        type: 'INIT_WINDOWS',
        data: initialState
    }
}

export const addWindow = (type, initialState) => {
    const newWindow = {
        type,
        initialState,
        id: Math.floor(Math.random()*10000)
    }
    return {
        type: 'ADD_WINDOW',
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