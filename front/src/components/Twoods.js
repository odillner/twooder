import React from 'react'
import {useSelector} from 'react-redux'
import {useTwood} from '../hooks'
import {Link} from 'react-router-dom'

export const Twood = ({id, initialState}) => {
    const {twood, operations} = useTwood(id, initialState)

    if (!twood) {
        return <div/>
    }
    return (
        <div className='twood'>
            <h3>{twood.content}</h3>
            <p>
                LIKES: {twood.likes}
                <button onClick={() => operations.like()}>LIKE</button>
            </p>
            <p>USER: {twood.user}</p>
            <p>ID: {twood.id}</p>
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