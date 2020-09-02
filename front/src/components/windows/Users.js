import React from 'react'

import StandardWindow from '../StandardWindow'
import StandardTable from '../StandardTable'
import {Profile} from '../Profile'

export const SingleUser = ({initialState, id}) => {
    return (
        <StandardWindow title='User' id={id}>
            <Profile user={initialState}/>
        </StandardWindow>
    )
}

export const Users = ({initialState, id}) => {
    return (
        <StandardWindow title='Users'  id={id}>
            <StandardTable initialState={initialState} type='users'/>
        </StandardWindow>
    )
}


export default Users