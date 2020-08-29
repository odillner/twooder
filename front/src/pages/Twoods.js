import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {Twood, TwoodList} from '../components/Twoods'

const Twoods = () => {
    const twoods = useSelector(state => state.twoods)

    return (
        <div>
            <h1>Twoods</h1>
            <TwoodList twoods={twoods}/>
        </div>
    )
}


export default Twoods