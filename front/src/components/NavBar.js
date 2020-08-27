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
                <div>
                    <Link to="/" className="right" onClick={logOut}>Log Out</Link>
                    <Link to="/newtwood">Twood</Link>
                </div>
                :
                <Link to="/signin" className="right">Sign In</Link>
            }
        </div>
    )
}

export default NavBar
