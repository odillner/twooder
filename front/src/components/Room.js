import React from 'react'

import StandardTable from '../components/StandardTable'

export const Room = ({room}) => {
    if (!room) return null

    return (
        <div>
            <p>name: {room.name} </p>
            <p>id: {room.id} </p>
            <StandardTable initialState={room.twoods} type='twoods'/>
        </div>
    )
}
