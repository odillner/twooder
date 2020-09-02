import React from 'react'
import {useSelector} from 'react-redux'

import StandardWindow from '../StandardWindow'
import {Profile} from '../Profile'

const OwnUser = ({initialState, id}) => {
    const {user} = useSelector(state => state.session)

    return (
        <StandardWindow title='Your Profile' id={id}>
            <Profile user={user}/>
        </StandardWindow>
    )
}


export default OwnUser