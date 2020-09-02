import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import {Button, TextField} from 'react95'

import twoodService from '../../services/twoods'
import {useField} from '../../hooks'
import StandardWindow from '../StandardWindow'
import StandardTable from '../StandardTable'
import {Twood} from '../Twood'
import {info, error} from '../../reducers/notification'

export const SingleTwood = ({initialState, id}) => {
    return (
        <StandardWindow title='Twood' id={id}>
            <Twood initialState={initialState}/>
        </StandardWindow>
    )
}

export const Twoods = ({initialState, id}) => {
    return (
        <StandardWindow title='Twoods' id={id}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const NewTwood = ({initialState, id}) => {
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
        <StandardWindow title='New Twood' id={id}>
            <form>
                content:
                <TextField multiline={true} {...contentField.input} />

                <Button id="twood-button" type="submit" onClick={create}>
                    Twood
                </Button>
            </form>
        </StandardWindow>
    )
}
