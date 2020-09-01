import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import userService from '../services/users'
import StandardWindow from '../components/StandardWindow'
import StandardTable from '../components/StandardTable'
import {Profile} from '../components/Profile'
import {info, error} from '../reducers/notification'

export const SingleUser = () => {
    const [user, setUser] = useState(null)
    const id = useParams().id

    const dispatch = useDispatch()

    const getUser = async () => {
        try {
            const res = await userService.getById(id)

            setUser(res)
        } catch (err) {
            dispatch(error('Error fetching user', 5))
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    return (
        <StandardWindow title='User'>
            <Profile user={user}/>
        </StandardWindow>
    )
}

export const Users = () => {
    const [users, setUsers] = useState([])

    const dispatch = useDispatch()

    const getUsers = async () => {
        try {
            const res = await userService.getAll()

            setUsers(res)
        } catch (err) {
            dispatch(error('Error fetching users', 5))
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <StandardWindow title='User'>
            <StandardTable initialState={users} type='users'/>
        </StandardWindow>
    )
}


export default Users