import React from 'react'
import {useSelector} from 'react-redux'


import  {Profile} from '../components/Profile'

const User = () => {
    const {user} = useSelector(state => state.session)

    return (
        <Profile user={user}/>
    )
}


export default User