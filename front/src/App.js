import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Notification from './components/Notification'
import NavBar from './components/NavBar'

import Routing from './pages/'
import StyleWrapper from './styles'
import WindowRenderer from './WindowRenderer'
import {initSession} from './reducers/session'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initSession())
    }, [])

    return (
        <StyleWrapper>
            <NavBar/>
            <Notification/>
            <Routing/>
            <WindowRenderer/>
        </StyleWrapper>
    )
}

export default App
