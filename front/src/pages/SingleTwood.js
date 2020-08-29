import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {Twood} from '../components/Twoods'
import {useTwood} from '../hooks'

const SingleTwood = () => {
    const id = useParams().id

    return (
        <Twood id={id}/>
    )
}


export default SingleTwood