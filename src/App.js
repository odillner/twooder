import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import Notification from './components/Notification'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

import Routing from './pages/'
import StyleWrapper from './styles'
import WindowRenderer from './WindowRenderer'
import {continueSession} from './reducers/session'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(continueSession())
    }, [])

    return (
        <StyleWrapper>
            <NavBar/>
            <Notification/>
            <Routing/>
            <WindowRenderer/>
            <Footer/>
        </StyleWrapper>
    )
}

export default App
