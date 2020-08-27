import React from 'react'
import {Link} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'

import {endSession} from '../reducers/session'

const NavBar = () => {
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    const logOut = () => {
        dispatch(endSession())
    }

    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            {session
                ?
                <Link to="/" className="right" onClick={logOut}>Log Out</Link>
                :
                <Link to="/signin" className="right">Log In</Link>
            }
        </div>
    )
}

export default NavBar
