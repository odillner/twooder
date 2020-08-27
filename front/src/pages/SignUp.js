import React from 'react'
import {useDispatch} from 'react-redux'

import {useField} from '../hooks'
import {info, error} from '../reducers/notification'

import userService from '../services/users'

const LogIn = () => {
    const nameField = useField('text')
    const passwordField = useField('text')

    const dispatch = useDispatch()

    const signUp = async (e) => {
        e.preventDefault()

        const user = {
            username: nameField.input.value,
            password: passwordField.input.value
        }
        try {
            await userService.create(user)
            dispatch(info('Successfully created user', 5))
        } catch (err) {
            dispatch(error('Failed to create user', 5))
        }

        nameField.clear()
        passwordField.clear()
    }

    return (
        <div className="signup-form">
            <h1>SIGN UP</h1>
            <form>
                name:
                <input {...nameField.input} />

                password:
                <input {...passwordField.input} />

                <button id="signup-button" type="submit" onClick={signUp}>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default LogIn
