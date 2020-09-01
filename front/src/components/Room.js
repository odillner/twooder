import React from 'react'

import StandardTable from '../components/StandardTable'

export const Room = ({room}) => {
    if (!room) {
        return null
    }
    return (
        <div className='profile'>
            <h1>room</h1>
            <p>name: {room.name} </p>
            <p>id: {room.id} </p>
            <div>
                <StandardTable initialState={room.twoods} type='twoods'/>
            </div>
        </div>
    )
}
