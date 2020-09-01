import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {TextField, Button} from 'react95'

import roomService from '../services/rooms'
import {useField} from '../hooks'
import {Room} from '../components/Room'
import StandardWindow from '../components/StandardWindow'
import StandardTable from '../components/StandardTable'
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
        <StandardWindow title='New Room'>
            <form>
                name:
                <TextField {...nameField.input} />

                <Button type="submit" onClick={create}>
                    Create
                </Button>
            </form>
        </StandardWindow>
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

    if (!room) return null
    return (
        <StandardWindow title='Room'>
            <Room room={room}/>
        </StandardWindow>
    )
}

export const Rooms = () => {
    const [rooms, setRooms] = useState(null)

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

    if (!rooms) return null
    return (
        <StandardWindow title='Rooms'>
            <StandardTable initialState={rooms} type='rooms'/>
        </StandardWindow>
    )
}
