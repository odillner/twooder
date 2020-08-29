import React from 'react'
import {useSelector} from 'react-redux'

import TwoodList, {Twood} from '../components/Twoods'

const Profile = () => {
    const twoods = useSelector(state => state.twoods)

    return (
        <TwoodList twoods={twoods}/>
    )
}


export default Profile