import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'

import roomService from '../services/rooms'

import {useField} from '../hooks'

import {Room, RoomList} from '../components/Room'
import {info, error} from '../reducers/notification'


export const NewRoom = () => {
    const nameField = useField('text')
    const token = useSelector(state => state.session.token)
    const history = useHistory()
    const dispatch = useDispatch()

    const create = async (e) => {
        e.preventDefault()

        const newRoom = {
            name: nameField.input.value
        }

        try {
            const res = await roomService.create(newRoom, token)

            dispatch(info('Room successfully created', 5))

            history.push(`rooms/${res.id}`)
        } catch (err) {
            dispatch(error('Error creating Room', 5))
        }

        nameField.clear()
    }

    return (
        <div className="newtwood-form">
            <h1>NEW ROOM</h1>
            <form>
                name:
                <input {...nameField.input} />

                <button type="submit" onClick={create}>
                    Create
                </button>
            </form>
        </div>
    )
}

export const SingleRoom = () => {
    const [room, setRoom] = useState(null)
    const id = useParams().id

    const dispatch = useDispatch()

    const getRoom = async () => {
        try {
            const res = await roomService.getById(id)

            setRoom(res)
        } catch (err) {
            dispatch(error('Error fetching room', 5))
        }
    }
    useEffect(() => {
        getRoom()
    }, [])

    return (
        <div>
            <Room room={room}/>
        </div>
    )
}

export const Rooms = () => {
    const [rooms, setRooms] = useState([])

    const dispatch = useDispatch()

    const getRooms = async () => {
        try {
            const res = await roomService.getAll()

            setRooms(res)
        } catch (err) {
            dispatch(error('Error fetching rooms', 5))
        }
    }
    useEffect(() => {
        getRooms()
    }, [])

    return (
        <div>
            <h1>Rooms</h1>
            <RoomList rooms={rooms}/>
        </div>
    )
}
