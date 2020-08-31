import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import userService from '../services/users'

import {Profile, ProfileList} from '../components/Profile'
import {info, error} from '../reducers/notification'

export const SingleRoom = () => {
    const [user, setUser] = useState(null)
    const id = useParams().id

    const dispatch = useDispatch()

    const getUsers = async () => {
        try {
            const res = await userService.getById(id)

            setUser(res)
        } catch (err) {
            dispatch(error('Error fetching twoods', 5))
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <Profile user={user}/>
        </div>
    )
}

export const Rooms = () => {
    const [users, setUsers] = useState([])

    const dispatch = useDispatch()

    const getUsers = async () => {
        try {
            const res = await userService.getAll()

            setUsers(res)
        } catch (err) {
            dispatch(error('Error fetching twoods', 5))
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <ProfileList users={users}/>
        </div>
    )
}


export default Users