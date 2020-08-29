import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import twoodService from '../services/twoods'

import {likeTwood, deleteTwood} from '../reducers/twoods'

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
    const {user, token} = useSelector(state => state.session)

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

    const like = () => {
        dispatch(likeTwood(twood, token))

        setTwood({
            ...twood,
            likes: twood.likes + 1
        })
    }

    const comment = async () => {
        return null
    }

    const remove = async () => {
        dispatch(deleteTwood(twood, token))

        setTwood(null)
    }

    const operations = {
        like: (user) ? like : null,
        comment: (user) ? comment : null,
        remove: (user && twood) ? (user.id === twood.user) ? remove : null : null
    }

    return {
        twood,
        operations
    }
}