module.exports = {
    info: (...params) => {
        if (process.env.NODE_ENV !== 'test' || 'production') {
            console.log(...params)
        }
    },

    error: (...params) => {
        if (process.env.NODE_ENV !== 'test' || 'production') {
            console.error(...params)
        }
    }
}

