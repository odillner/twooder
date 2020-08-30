import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {TwoodList} from '../components/Twoods'
import {setAllTwoods} from '../reducers/twoods'

const Twoods = () => {
    const twoods = useSelector(state => state.twoods)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAllTwoods())
    }, [])

    return (
        <div>
            <h1>Twoods</h1>
            <TwoodList twoods={twoods}/>
        </div>
    )
}


export default Twoods