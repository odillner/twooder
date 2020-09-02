import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {Window, WindowHeader, WindowContent} from 'react95'
import CloseButton from './CloseButton'
import {clear} from '../reducers/notification'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    if (notification === null) return null

    const style = (notification.type === 'Error') ? {backgroundColor: 'red'} : null

    return (
        <Window className='window' style={{position: 'absolute', left: '80%', width: '20%'}}>
            <WindowHeader className='window-header' style={style}>
                <span>{notification.type}</span>
                <CloseButton onClose={() => dispatch(clear())}></CloseButton>
            </WindowHeader>
            <WindowContent>{notification.message}</WindowContent>
        </Window>
    )
}

export default Notification