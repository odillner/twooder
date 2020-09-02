import React from 'react'
import {Link} from 'react-router-dom'
import {useTwood} from '../hooks'

import {ToolPanel, Fieldset, Button, Divider, TextField} from 'react95'

export const TwoodReply = ({id, initialState}) => {
    const {twood, operations} = useTwood(id, initialState)

    if (!twood) return null

    const {user} = twood
    const {like} = operations

    return (
        <Fieldset
            label={user.username}
        >
            <Link to={`/twoods/${twood.id}`}>
                {twood.content}
                <p>LIKES: {twood.likes}</p>
            </Link>
        </Fieldset>
    )

}

export const Twood = ({id, initialState}) => {
    const {twood, operations, replyField} = useTwood(id, initialState)

    if (!twood) return null

    const {like, reply, remove} = operations
    const {user} = twood

    return (
        <div>
            <Fieldset label={user.username}>
                {twood.content}
                <p>LIKES: {twood.likes}</p>
            </Fieldset>
            {reply ?
                <form>
                    <TextField {...replyField.input} />
                    <Button
                        size='sm'
                        onClick={(e) => {operations.reply(replyField.input.value, e)}}
                    >
                        REPLY
                    </Button>
                </form>
                : null
            }
            {like ? <Button size='sm' onClick={() => like()}>LIKE</Button> : null}
            {remove ? <Button size='sm' onClick={() => remove()}>REMOVE</Button> : null}

            <Divider/>

            {twood.replies.map(reply => {
                return (
                    <TwoodReply key={reply.id} id={reply.id}/>
                )
            })}
        </div>
    )

}