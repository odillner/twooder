import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

import Notification from './components/Notification'
import NavBar from './components/NavBar'
import Header from './components/Header'

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import NewTwood from './pages/NewTwood'
import Home from './pages/Home'
import Twoods from './pages/Twoods'
import SingleTwood from './pages/SingleTwood'

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
            <Switch>
                <Route path="/twoods/:id">
                    <SingleTwood/>
                </Route>
                <Route path="/twoods">
                    <Twoods/>
                </Route>
                <Route path="/signin">
                    {user ? storageChecked ? <Redirect to="/"/> : <div/> : <SignIn/>}
                </Route>
                <Route path="/signup">
                    {user ? storageChecked ? <Redirect to="/"/> : <div/> : <SignUp/>}
                </Route>
                <Route path="/profile/:id">
                    <Profile />
                </Route>
                <Route path="/profile/">
                    {user ? <Profile /> : storageChecked ? <Redirect to="/signin" /> : <div/>}
                </Route>
                <Route path="/newtwood/">
                    {user ? <NewTwood /> : storageChecked ? <Redirect to="/signin" /> : <div/>}
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    )
}

export default App
