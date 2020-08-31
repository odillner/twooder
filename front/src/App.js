import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'

import Notification from './components/Notification'
import NavBar from './components/NavBar'
import Header from './components/Header'

import Navigation from './pages/'

import {initSession} from './reducers/session'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initSession())
    }, [])

    return (
        <div>
            <Header/>
            <NavBar/>
            <Notification/>
            <Navigation/>
        </div>
    )
}

export default App
