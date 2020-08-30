import React, { useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {Profile, ProfileList} from '../components/Profile'
/*
const SingleUser = (id) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        userService.getById(id)
    }, [])

    const getTwood = async () => {
        const res = await userService.getById(id)
        setTwood(res)
    }
}
*/
const Users = () => {
    const id = useParams().id

    if (id) {
        return (
            <Profile/>
        )
    } else {
        return (
            <div>
                <h1>Twoods</h1>
                <ProfileList/>
            </div>
        )
    }
}


export default Users