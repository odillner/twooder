import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import twoodService from '../services/twoods'

import {info, error} from '../reducers/notification'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const clear = () => {
        setValue('')
    }

    return {
        input: {
            type,
            value,
            onChange
        },
        clear
    }
}

export const useTwood = (id, initialState) => {
    const [twood, setTwood] = useState(null)
    const dispatch = useDispatch()
    const session = useSelector(state => state.session)

    useEffect(() => {
        if (id) {
            getTwood()
        } else {
            setTwood(initialState)
        }
    }, [id, initialState])

    const getTwood = async () => {
        const res = await twoodService.getById(id)
        setTwood(res)
    }

    const like = async () => {
        const newTwood = {
            ...twood,
            likes: twood.likes + 1
        }

        try {
            const res = await twoodService.update(newTwood.id, newTwood, session.token)

            setTwood(res)
            dispatch(info('Twood successfully liked', 5))
        } catch (err) {
            dispatch(error('Error liking twood', 5))
        }
    }

    const comment = async () => {
        return null
    }

    const remove = async () => {
        try {
            await twoodService.remove(twood.id, session.token)

            setTwood(null)
            dispatch(info('Twood successfully deleted', 5))
        } catch (err) {
            dispatch(error('Error deleting twood', 5))
        }
    }
    const operations = {
        like,
        comment,
        remove
    }

    return {
        twood,
        operations
    }
}