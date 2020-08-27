import React from 'react'
import {useDispatch} from 'react-redux'

import {initSession} from '../reducers/session'
import {useField} from '../hooks'
import {useHistory} from 'react-router-dom'

const LogIn = () => {
    const history = useHistory()

    const nameField = useField('text')
    const passwordField = useField('text')

    const dispatch = useDispatch()

    const signUp = (e) => {
        e.preventDefault()

        const username = nameField.input.value
        const password = passwordField.input.value

        dispatch(initSession(username, password))

        nameField.clear()
        passwordField.clear()
    }

    return (
        <div className="signin-form">
            <h1>SIGN IN</h1>
            <form>
                name:
                <input {...nameField.input} />

                password:
                <input {...passwordField.input} />

                <button id="signin-button" type="submit" onClick={signUp}>
                    Sign In
                </button>
            </form>
            <p>not a twooder user?
                <button id="redirect-sign-up-button" type="submit" onClick={() => history.push('/signup/')}>
                    Sign Up!
                </button>
            </p>
        </div>
    )
}

export default LogIn
