import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {addWindow} from '../reducers/windows'

const OwnUser = () => {
    const {user} = useSelector(state => state.session)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addWindow('ownuser', user))
    }, [])

    return (
        null
    )
}


export default OwnUser