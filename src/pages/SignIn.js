import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {addWindow} from '../reducers/windows'

const SignIn = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addWindow('signin'))
    }, [])

    return (
        null
    )
}

export default SignIn
