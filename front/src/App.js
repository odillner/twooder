import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

import Notification from './components/Notification'
import NavBar from './components/NavBar'
import Header from './components/Header'

import Navigation from './pages/'

import {initSession} from './reducers/session'

function App() {
    const dispatch = useDispatch()
    const {user, storageChecked} = useSelector(state => state.session)

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
