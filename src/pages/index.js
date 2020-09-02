import React from 'react'
import {useSelector} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'

import SignUp from './SignUp'
import SignIn from './SignIn'
import OwnUser from './OwnUser'
import Home from './Home'
import {Users, SingleUser} from './Users'
import {Twoods, SingleTwood, NewTwood} from './Twoods'
import {Rooms, SingleRoom, NewRoom} from './Rooms'

const Routing = () => {
    const {user, storageChecked} = useSelector(state => state.session)

    return (
        <Switch>
            <Route path="/signin">
                {user ? storageChecked ? <Redirect to="/"/> : <div/> : <SignIn/>}
            </Route>
            <Route path="/signup">
                {user ? storageChecked ? <Redirect to="/"/> : <div/> : <SignUp/>}
            </Route>
            <Route path="/twoods/:id">
                <SingleTwood/>
            </Route>
            <Route path="/twoods">
                <Twoods/>
            </Route>
            <Route path="/rooms/:id">
                <SingleRoom/>
            </Route>
            <Route path="/rooms">
                <Rooms/>
            </Route>
            <Route path="/users/:id">
                <SingleUser />
            </Route>
            <Route path="/users/">
                <Users/>
            </Route>
            <Route path="/user/">
                {user ? <OwnUser /> : storageChecked ? <Redirect to="/signin" /> : <div/>}
            </Route>
            <Route path="/newtwood/">
                {user ? <NewTwood /> : storageChecked ? <Redirect to="/signin" /> : <div/>}
            </Route>
            <Route path="/newroom">
                {user ? <NewRoom /> : storageChecked ? <Redirect to="/signin" /> : <div/>}
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}

export default Routing
