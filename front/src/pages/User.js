import React from 'react'
import {useSelector} from 'react-redux'

import StandardWindow from '../components/StandardWindow'
import  {Profile} from '../components/Profile'

const User = () => {
    const {user} = useSelector(state => state.session)

    return (
        <StandardWindow title='Your Profile'>
            <Profile user={user}/>
        </StandardWindow>
    )
}


export default User