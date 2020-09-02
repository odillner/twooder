import React from 'react'

import StandardTable from '../components/StandardTable'

export const Profile = ({user}) => {
    if (!user) return null

    if (user) {
        return (
            <div>
                <p>username: {user.username} </p>
                <p>id: {user.id} </p>
                <StandardTable initialState={user.twoods} type='twoods'/>
            </div>
        )
    }


}