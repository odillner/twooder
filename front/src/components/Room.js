import React from 'react'
import {Link} from 'react-router-dom'

import TwoodList from './Twood'

export const Room = ({room}) => {
    if (room) {
        return (
            <div className='profile'>
                <h1>room</h1>
                <p>name: {room.name} </p>
                <p>id: {room.id} </p>
                <div>
                    <TwoodList twoods={room.twoods}/>
                </div>
            </div>
        )
    }

    return (
        <div/>
    )
}

export const RoomList = ({rooms}) => {
    if (!rooms) {
        return (<div/>)
    }
    return (
        <div>
            {rooms.map(room => {
                return (
                    <div key={room.id} className='profile'>
                        <Link to={`/rooms/${room.id}`}>
                            <h1>room</h1>
                            <p>username: {room.name} </p>
                        </Link>
                        <p>id: {room.id} </p>
                    </div>
                )
            })}
        </div>
    )
}
