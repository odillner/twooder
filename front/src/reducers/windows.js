const initialState = {
    current: 0,
    items: []
}

const windowReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'ADD_WINDOW': {
        const newState = {
            current: action.data.id,
            items: state.items.concat(action.data)
        }
        return newState
    }
    case 'CLOSE_WINDOW': {
        const newState = {
            ...state,
            items: state.items.filter(item => item.id != action.data)
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
    case 'RESET_WINDOWS': {
        return []
    }
    default: return state
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