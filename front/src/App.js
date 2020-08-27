import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

import Notification from './components/Notification'
import NavBar from './components/NavBar'

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Home from './pages/Home'

import {initSession} from './reducers/session'

function App() {
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    useEffect(() => {
        dispatch(initSession())
    }, [])

    return (
        <div>
            <NavBar/>
            <Notification/>
            <Switch>
                <Route path="/signin">
                    {session ? <Redirect to="/"/> : <SignIn/>}
                </Route>
                <Route path="/signup">
                    {session ? <Redirect to="/"/> : <SignUp/>}
                </Route>
                <Route path="/profile/:id">
                    <Profile />
                </Route>
                <Route path="/profile/">
                    {session ? <Profile /> : <Redirect to="/signin" />}
                </Route>
                <Route path="/">
                    {session ? <Redirect to="/profile" /> : <Home />}
                </Route>
            </Switch>
        </div>
    )
}

export default App
