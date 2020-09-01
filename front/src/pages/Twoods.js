import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {Button, TextField} from 'react95'

import twoodService from '../services/twoods'

import {useField} from '../hooks'
import StandardWindow from '../components/StandardWindow'
import StandardTable from '../components/StandardTable'

import {Twood} from '../components/Twood'
import {info, error} from '../reducers/notification'

export const SingleTwood = () => {
    const id = useParams().id
    const [twood, setTwood] = useState(null)

    const dispatch = useDispatch()

    const getTwood = async () => {
        try {
            const res = await twoodService.getById(id)

            setTwood(res)
        } catch (err) {
            dispatch(error('Error fetching twood', 5))
        }
    }
    useEffect(() => {
        getTwood()
    }, [id])

    return (
        <StandardWindow title='Twood'>
            <Twood initialState={twood}/>
        </StandardWindow>
    )
}

export const Twoods = () => {
    const [twoods, setTwoods] = useState([])

    const dispatch = useDispatch()

    const getTwoods = async () => {
        try {
            const res = await twoodService.getAll()

            setTwoods(res)
        } catch (err) {
            dispatch(error('Error fetching twoods', 5))
        }
    }
    useEffect(() => {
        getTwoods()
    }, [])

    return (
        <StandardWindow title='Twoods'>
            <StandardTable initialState={twoods} type='twoods'/>
        </StandardWindow>
    )
}

export const NewTwood = () => {
    const token = useSelector(state => state.session.token)
    const history = useHistory()
    const dispatch = useDispatch()

    const titleField = useField('text')
    const contentField = useField('text')

    const create = async (e) => {
        e.preventDefault()

        const newTwood = {
            title: titleField.input.value,
            content: contentField.input.value
        }

        try {
            const res = await twoodService.create(newTwood, token)

            dispatch(info('Twood successfully created', 5))

            history.push(`twoods/${res.id}`)
        } catch (err) {
            dispatch(error('Error creating twood', 5))
        }

        contentField.clear()
    }

    return (
        <StandardWindow title='New Twood'>
            <form>
                title:
                <TextField {...titleField.input} />
                content:
                <TextField multiline={true} {...contentField.input} />

                <Button id="twood-button" type="submit" onClick={create}>
                    Twood
                </Button>
            </form>
        </StandardWindow>
    )
}
