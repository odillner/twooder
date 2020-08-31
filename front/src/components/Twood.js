import React from 'react'
import {useTwood} from '../hooks'
import {Link} from 'react-router-dom'

export const TwoodLink = ({twood}) => {
    if (!twood) {
        return null
    }

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

export const TwoodReply = ({id, initialState}) => {
    const {twood, operations} = useTwood(id, initialState)

    if (!twood) {
        return null
    }

    const {user} = twood
    const {like} = operations

    return (
        <div className='reply'>
            <p>{user.username}</p>
            <div className='content'>
                <Link to={`/twoods/${twood.id}`}>
                    <h3>{twood.content}</h3>
                </Link>
                <p>
                    LIKES: {twood.likes}
                    {like ? <button onClick={() => like()}>LIKE</button> : <></>}
                </p>
            </div>
        </div>
    )

}

export const Twood = ({id, initialState}) => {
    const {twood, operations, replyField} = useTwood(id, initialState)

    if (!twood) {
        return null
    }
    const {like, reply, remove} = operations
    const {user} = twood

    return (
        <div>
            <div className='twood'>
                <p>{user.username}</p>
                <div className='content'>
                    <h3>{twood.content}</h3>
                    <p>ID: {twood.id}</p>
                    <p>
                        LIKES: {twood.likes}
                        {like ? <button onClick={() => like()}>LIKE</button> : <></>}
                    </p>
                </div>
                {reply ?
                    <form>
                        <input {...replyField.input} />

                        <button id="twood-button" onClick={
                            (e) => {operations.reply(replyField.input.value, e)}
                        }>
                            REPLY
                        </button>
                    </form>
                    : <></>
                }
                {remove ? <button onClick={() => remove()}>REMOVE</button> : <></>}
            </div>
            <div className='replies'>
                {twood.replies.map(reply => {
                    return (
                        <TwoodReply key={reply.id} id={reply.id}/>
                    )
                })}
            </div>
        </div>
    )

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