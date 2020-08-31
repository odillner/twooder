import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import twoodService from '../services/twoods'

import {TwoodList} from '../components/Twood'
import {info, error} from '../reducers/notification'

const User = () => {
    const [twoods, setTwoods] = useState([])
    const {user} = useSelector(state => state.session)

    const dispatch = useDispatch()


    const getTwoods = async () => {
        try {
            const res = await twoodService.getByUser(user.id)

            setTwoods(res)
        } catch (err) {
            dispatch(error('Error fetching twoods', 5))
        }
    }
    useEffect(() => {
        getTwoods()
    }, [])

    return (
        <TwoodList twoods={twoods}/>
    )
}


export default User