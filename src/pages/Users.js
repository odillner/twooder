import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import userService from '../services/users'
import {info, error} from '../reducers/notification'
import {addWindow} from '../reducers/windows'

export const SingleUser = () => {
    const id = useParams().id
    const dispatch = useDispatch()

    const getUser = async () => {
        try {
            const res = await userService.getById(id)

            dispatch(addWindow('user', res))
        } catch (err) {
            dispatch(error('Error fetching user', 5))
        }
    }
    useEffect(() => {
        getUser()
    }, [id])

    return (
        null
    )
}

export const Users = () => {
    const dispatch = useDispatch()

    const getUsers = async () => {
        try {
            const res = await userService.getAll()

            dispatch(addWindow('users', res))
        } catch (err) {
            dispatch(error('Error fetching users', 5))
        }
    }
    useEffect(() => {
        getUsers()
    }, [])


    return (
        null
    )
}


export default Users