import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams,} from 'react-router-dom'

import roomService from '../services/rooms'
import {info, error} from '../reducers/notification'
import {addWindow} from '../reducers/windows'

export const SingleRoom = () => {
    const id = useParams().id

    const dispatch = useDispatch()

    const getRoom = async () => {
        try {
            const res = await roomService.getById(id)

            dispatch(addWindow('room', res))
        } catch (err) {
            dispatch(error('Error fetching room', 5))
        }
    }

    useEffect(() => {
        getRoom()
    }, [])

    return (
        null
    )
}

export const Rooms = () => {
    const dispatch = useDispatch()

    const getRooms = async () => {
        try {
            const res = await roomService.getAll()

            dispatch(addWindow('rooms', res))
        } catch (err) {
            dispatch(error('Error fetching rooms', 5))
        }
    }
    useEffect(() => {
        getRooms()
    }, [])

    return (
        null
    )
}

export const NewRoom = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addWindow('newroom'))
    }, [])

    return (
        null
    )
}