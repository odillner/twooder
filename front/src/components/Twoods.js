import React from 'react'
import {useTwood} from '../hooks'
import {Link} from 'react-router-dom'

export const Twood = ({id, initialState}) => {
    const {twood, operations} = useTwood(id, initialState)
    const {like, comment, remove} = operations

    if (!twood) {
        return <div/>
    }
    return (
        <div className='twood'>
            <h3>{twood.content}</h3>
            <p>
                LIKES: {twood.likes}
                {like ? <button onClick={() => operations.like()}>LIKE</button> : <a/>}
            </p>
            <p>USER: {twood.user}</p>
            <p>ID: {twood.id}</p>
            {remove ? <button onClick={() => operations.remove()}>REMOVE</button> : <a/>}
        </div>
    )
}

export const TwoodList = ({twoods}) => {
    return (
        <div>
            {twoods.map(twood => {
                return (
                    <Link key={twood.id} to={`/twoods/${twood.id}`}>
                        <Twood initialState={twood}/>
                    </Link>
                )
            })}
        </div>
    )
}

export default TwoodList