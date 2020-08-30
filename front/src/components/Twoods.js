import React from 'react'
import {useTwood} from '../hooks'
import {Link} from 'react-router-dom'

export const TwoodLink = ({twood}) => {
    if (!twood) {
        return <div/>
    } else {
        const {user} = twood

        return (
            <div className='twood'>
                <p>{user.username}</p>
                <div className='content'>
                    <Link to={`/twoods/${twood.id}`}>
                        <h3>{twood.content}</h3>
                    </Link>
                    <p>LIKES: {twood.likes}</p>
                </div>
            </div>
        )
    }
}

export const Twood = ({id, initialState}) => {
    const {twood, operations} = useTwood(id, initialState)

    if (!twood) {
        return <div/>
    } else {
        const {like, reply, remove} = operations
        const {user} = twood

        return (
            <div className='twood'>
                <p>{user.username}</p>
                <p>ID: {twood.id}</p>
                <div className='content'>
                    <h3>{twood.content}</h3>
                    <p>
                        LIKES: {twood.likes}
                        {like ? <button onClick={() => operations.like()}>LIKE</button> : <></>}
                    </p>
                    {remove ? <button onClick={() => operations.remove()}>REMOVE</button> : <></>}
                </div>
                <div className='replies'>
                    {twood.replies.map(twood => {
                        return (
                            <TwoodLink key={twood.id} twood={twood}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export const TwoodList = ({twoods}) => {
    return (
        <div>
            {twoods.map(twood => {
                return (
                    <TwoodLink key={twood.id} twood={twood}/>
                )
            })}
        </div>
    )
}

export default TwoodList