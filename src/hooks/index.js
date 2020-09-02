import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import twoodService from '../services/twoods'

import {info, error} from '../reducers/notification'
import {addTwood, likeTwood, replyTwood, removeTwood} from '../reducers/twoods'

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

export const useTwood = (id) => {
    const dispatch = useDispatch()
    const {user, token} = useSelector(state => state.session)
    const twood = useSelector(state => state.twoods).find(twood => twood.id === id)

    const replyField = useField('text')

    useEffect(() => {
        if (!twood) {
            getTwood()
        }
    }, [id])

    const getTwood = async () => {
        try {
            const res = await twoodService.getById(id)

            dispatch(addTwood(res))
        } catch (err) {
            dispatch(error('Error fetching twood', 5))
        }
    }

    const like = async () => {
        dispatch(likeTwood(twood, token))
    }

    const reply = async (content, e) => {
        e.preventDefault()
        const newTwood = {
            content: content
        }

        dispatch(replyTwood(twood, newTwood, token))
    }

    const remove = async () => {
        dispatch(removeTwood(twood, token))
    }

    const operations = {
        like: (user) ? like : null,
        reply: (user) ? reply : null,
        remove: (user && twood) ? (user.id === twood.user.id) ? remove : null : null
    }

    return {
        twood,
        operations,
        replyField
    }
}

export const usePages = (initialState) => {
    const [index, setIndex] = useState(0)
    const [pages, setPages] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [sortOrder, setSortOrder] = useState(false)

    const initPages = (list) => {
        const nofPages = Math.ceil(list.length/pageSize)

        let temp = []

        let count = 0

        for (let i=0;i<nofPages;i++) {
            temp[i] = []
            for (let j=0;j<pageSize;j++) {
                temp[i][j] = list[count]
                count++
                if (count === list.length) {
                    break
                }
            }
        }

        setPages(temp)
    }

    useEffect(() => {
        if (initialState[0]) {
            initPages(initialState)
        }
    }, [initialState])

    const nextPage = () => {
        setIndex(index+1)
    }

    const prevPage = () => {
        setIndex(index-1)
    }

    const sort = (head) => {
        setSortOrder(!sortOrder)

        initPages(initialState.sort((a, b) => {
            if (sortOrder) {
                return a[head] > b[head]
            } else {
                return a[head] < b[head]
            }
        }))
    }

    const operations = {
        next: (index != pages.length-1) ? nextPage : null,
        prev: (index > 0) ? prevPage : null,
        sort
    }

    const current = (pages[0]) ? pages[index] : []

    return {
        current,
        operations
    }
}