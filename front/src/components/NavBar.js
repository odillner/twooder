import React from 'react'
import {Link} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'

import {endSession} from '../reducers/session'

const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const logOut = () => {
        dispatch(endSession())
    }

    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/twoods">Twoods</Link>
            <Link to="/users">Users</Link>
            <Link to="/rooms">Rooms</Link>
            {user
                ?
                <div>
                    <Link to="/" className="right" onClick={logOut}>Log Out</Link>
                    <Link to="/user" className="right">Profile</Link>
                    <Link to="/newtwood">Twood</Link>
                </div>
                :
                <Link to="/signin" className="right">Sign In</Link>
            }
        </div>
    )
}

export default NavBar
