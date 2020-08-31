import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import twoodService from '../services/twoods'

import {Twood, TwoodList} from '../components/Twood'
import {info, error} from '../reducers/notification'

export const SingleTwood = () => {
    const id = useParams().id

    return (
        <Twood id={id}/>
    )
}


export const Twoods = () => {
    const [twoods, setTwoods] = useState([])

    const dispatch = useDispatch()

    const getTwoods = async () => {
        try {
            const res = await twoodService.getAll()

            setTwoods(res)
        } catch (err) {
            dispatch(error('Error fetching twoods', 5))
        }
    }
    useEffect(() => {
        getTwoods()
    }, [])

    return (
        <div>
            <h1>Twoods</h1>
            <TwoodList twoods={twoods}/>
        </div>
    )
}
