import React from 'react'
import {useParams} from 'react-router-dom'

import {Twood} from '../components/Twoods'

const SingleTwood = () => {
    const id = useParams().id

    return (
        <Twood id={id}/>
    )
}


export default SingleTwood