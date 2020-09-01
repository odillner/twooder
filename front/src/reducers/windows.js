const windowReducer = (state = [], action) => {
    switch (action.type) {
    case 'ADD_WINDOW': {
        return state.concat(action.data)
    }
    case 'CLOSE_WINDOW': {
        return state.concat(action.data)
    }
    case 'RESET': {
        return []
    }
    default: return state
    }
}

const addWindow = (type) => {
    return {
        type: 'ADD_WINDOW',
        data: type
    }
}
export default windowReducer