import React from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Button, TextField} from 'react95'

import StandardWindow from '../StandardWindow'
import {manualSignIn} from '../../reducers/session'
import {closeWindow} from '../../reducers/windows'
import {useField} from '../../hooks'

const SignIn = ({initialState, id}) => {
    const history = useHistory()

    const nameField = useField('text')
    const passwordField = useField('text')

    const dispatch = useDispatch()

    const signIn = (e) => {
        e.preventDefault()

        const username = nameField.input.value
        const password = passwordField.input.value

        dispatch(manualSignIn(username, password, id))

        nameField.clear()
        passwordField.clear()
    }

    const openSignUp = () => {
        dispatch(closeWindow(id))
        history.push('/signup/')
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
                onClick={() => openSignUp()}
            >
            Sign Up!
            </Button>
        </StandardWindow>
    )
}

export default SignIn
