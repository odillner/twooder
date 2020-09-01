import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useTwood} from '../hooks'

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