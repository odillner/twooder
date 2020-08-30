import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {createTwood} from '../reducers/twoods'
import {useField} from '../hooks'

const LogIn = () => {
    const contentField = useField('text')
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    const create = (e) => {
        e.preventDefault()

        const newTwood = {
            content: contentField.input.value
        }

        dispatch(createTwood(newTwood, session.token))

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

export default LogIn
