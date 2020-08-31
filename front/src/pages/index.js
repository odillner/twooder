import React from 'react'
import {useSelector} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

import SignUp from './SignUp'
import SignIn from './SignIn'
import User from './User'
import Users from './Users'
import NewTwood from './NewTwood'
import Home from './Home'
import Twoods from './Twoods'
import SingleTwood from './SingleTwood'

function Navigation() {
    const {user, storageChecked} = useSelector(state => state.session)

    return (
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
            <Route path="/users/:id">
                <Users />
            </Route>
            <Route path="/users/">
                <Users />
            </Route>
            <Route path="/user/">
                {user ? <User /> : storageChecked ? <Redirect to="/signin" /> : <div/>}
            </Route>
            <Route path="/newtwood/">
                {user ? <NewTwood /> : storageChecked ? <Redirect to="/signin" /> : <div/>}
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}

export default Navigation