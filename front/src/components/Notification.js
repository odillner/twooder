import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {Window, WindowHeader, WindowContent, Button} from 'react95'
import CloseIcon from './CloseIcon'
import {clear} from '../reducers/notification'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    if (notification === null) {
        return null
    }
    const style = (notification.type === 'Error') ? {backgroundColor: 'red'} : null

    return (
        <Window className='window' style={{position: 'absolute', left: '80%', width: '20%'}}>
            <WindowHeader className='window-header' style={style}>
                <span>{notification.type}</span>
                <Button
                    style={{float: 'right', margin: '3px'}}
                    onClick={() => dispatch(clear())}
                >
                    <CloseIcon/>
                </Button>
            </WindowHeader>
            <WindowContent>{notification.message}</WindowContent>
        </Window>
    )
}

export default Notification