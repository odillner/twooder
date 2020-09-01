import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Navigation from './pages'

function WindowRenderer() {
    const dispatch = useDispatch()

    const selector = useSelector(state => state.windows)

    return (

    )
}

export default WindowRenderer
