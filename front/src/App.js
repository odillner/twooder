import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import Notification from './components/Notification'
import NavBar from './components/NavBar'

import Navigation from './pages/'
import StyleWrapper from './styles'
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
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Navigation/>
            </div>
        </StyleWrapper>
    )
}

export default App
