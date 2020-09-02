import React from 'react'
import {useDispatch} from 'react-redux'
import {Button, TextField} from 'react95'

import StandardWindow from '../StandardWindow'
import {useField} from '../../hooks'
import {info, error} from '../../reducers/notification'
import userService from '../../services/users'

const LogIn = ({initialState, id}) => {
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
        <StandardWindow title='Sign Up' id={id}>
            <form>
                User Name: <TextField {...nameField.input} />
                Password: <TextField {...passwordField.input} />

                <Button
                    id="signin-button"
                    type="submit"
                    onClick={signUp}
                >
                    Sign Up
                </Button>
            </form>
        </StandardWindow>
    )
}

export default LogIn
