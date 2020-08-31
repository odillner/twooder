import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import twoodService from '../services/twoods'

import {useField} from '../hooks'
import {info, error} from '../reducers/notification'

const NewTwood = () => {
    const contentField = useField('text')
    const token = useSelector(state => state.session.token)
    const history = useHistory()
    const dispatch = useDispatch()

    const create = async (e) => {
        e.preventDefault()

        const newTwood = {
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
        <div className="newtwood-form">
            <h1>NEW TWOOD</h1>
            <form>
                content:
                <input {...contentField.input} />

                <button id="twood-button" type="submit" onClick={create}>
                    Twood
                </button>
            </form>
        </div>
    )
}

export default NewTwood
