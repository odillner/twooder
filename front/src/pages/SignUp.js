import React from 'react'
import {useDispatch} from 'react-redux'

import {initSession} from '../reducers/session'
import {useField} from '../hooks'

const LogIn = () => {
    const nameField = useField('text')
    const passwordField = useField('text')

    const dispatch = useDispatch()

    const logIn = async (e) => {
        e.preventDefault()

        const username = nameField.input.value
        const password = passwordField.input.value

        dispatch(initSession(username, password))

        nameField.clear()
        passwordField.clear()
    }

    return (
        <div className="signup-form">
            <form>
                name:
                <input {...nameField.input} />

                password:
                <input {...passwordField.input} />

                <div>
                    <button id="signup-button" type="submit" onClick={logIn}>
                        Log In
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LogIn
