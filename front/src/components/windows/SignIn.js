import React from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Button, TextField} from 'react95'

import StandardWindow from '../StandardWindow'
import {initSession} from '../../reducers/session'
import {useField} from '../../hooks'

const LogIn = ({initialState, id}) => {
    const history = useHistory()

    const nameField = useField('text')
    const passwordField = useField('text')

    const dispatch = useDispatch()

    const signIn = (e) => {
        e.preventDefault()

        const username = nameField.input.value
        const password = passwordField.input.value

        dispatch(initSession(username, password))

        nameField.clear()
        passwordField.clear()
    }

    return (
        <StandardWindow title='Sign In' id={id}>
            <form>
                User Name: <TextField {...nameField.input} />
                Password: <TextField {...passwordField.input} />

                <Button
                    styles={{float: 'right'}}
                    id="signin-button" type="submit"
                    primary={true}
                    onClick={signIn}
                >
                    Sign In
                </Button>
            </form>
            not a twooder user?
            <Button
                id="redirect-sign-up-button"
                type="submit"
                onClick={() => history.push('/signup/')}
            >
                Sign Up!
            </Button>
        </StandardWindow>
    )
}

export default LogIn
