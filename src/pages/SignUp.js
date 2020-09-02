import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {addWindow} from '../reducers/windows'

const SignUp = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addWindow('signup'))
    }, [])

    return (
        null
    )
}

export default SignUp
