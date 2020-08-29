import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {Twood, TwoodList} from '../components/Twoods'

const Users = () => {
    const twoods = useSelector(state => state.twoods)
    const id = useParams().id

    if (id) {
        const twood = twoods.find(twood => twood.id === id)

        return (
            <Twood twood={twood}/>
        )
    } else {
        return (
            <div>
                <h1>Twoods</h1>
                <TwoodList twoods={twoods}/>
            </div>
        )
    }
}


export default Users