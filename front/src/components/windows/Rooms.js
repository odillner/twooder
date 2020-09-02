import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {TextField, Button} from 'react95'

import roomService from '../../services/rooms'
import {useField} from '../../hooks'
import {Room} from '../Room'
import StandardWindow from '../StandardWindow'
import StandardTable from '../StandardTable'
import {info, error} from '../../reducers/notification'

export const SingleRoom = ({initialState, id}) => {
    return (
        <StandardWindow title='Room' id={id}>
            <Room room={initialState}/>
        </StandardWindow>
    )
}

export const Rooms = ({initialState, id}) => {
    return (
        <StandardWindow title='Rooms' id={id}>
            <StandardTable initialState={initialState} type='rooms'/>
        </StandardWindow>
    )
}

export const NewRoom = ({initialState, id}) => {
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
        <StandardWindow title='New Room' id={id}>
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