import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import twoodService from '../services/twoods'
import {info, error} from '../reducers/notification'
import {addWindow} from '../reducers/windows'
import {addTwood} from '../reducers/twoods'

export const SingleTwood = () => {
    const id = useParams().id
    const dispatch = useDispatch()

    const getTwood = async () => {
        try {
            dispatch(addWindow('twood', id))
        } catch (err) {
            dispatch(error('Error fetching twood', 5))
        }
    }
    useEffect(() => {
        getTwood()
    }, [id])

    return (
        null
    )
}

export const Twoods = () => {
    const dispatch = useDispatch()

    const getTwoods = async () => {
        try {
            const res = await twoodService.getAll()

            dispatch(addTwood(res))
            dispatch(addWindow('twoods', res))
        } catch (err) {
            dispatch(error('Error fetching twoods', 5))
        }
    }

    useEffect(() => {
        getTwoods()
    }, [])

    return (
        null
    )
}

export const NewTwood = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addWindow('newtwood'))
    }, [])

    return (
        null
    )
}