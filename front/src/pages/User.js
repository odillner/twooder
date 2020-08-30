import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {TwoodList} from '../components/Twoods'
import {setTwoodsByUser} from '../reducers/twoods'

const User = () => {
    const twoods = useSelector(state => state.twoods)
    const {user} = useSelector(state => state.session)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTwoodsByUser(user.id))
    }, [])

    return (
        <TwoodList twoods={twoods}/>
    )
}


export default User