import React from 'react'
import {Window, WindowHeader, WindowContent, Button} from 'react95'
import Draggable from 'react-draggable'
import {useDispatch} from 'react-redux'

import CloseIcon from './CloseIcon'
import {closeWindow} from '../reducers/windows'
import {useHistory} from 'react-router-dom'

const StandardWindow = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const close = () => {
        dispatch(closeWindow(props.id))
        history.push('/')
    }

    return (
        <Draggable>
            <div style={{display: 'flex', justifyContent: 'center', position: 'absolute'}}>
                <Window className='window'>
                    <WindowHeader className='window-header'>
                        {props.title}
                        <Button
                            style={{float: 'right', margin: '3px'}}
                            onClick={() => close()}
                        >
                            <CloseIcon/>
                        </Button>
                    </WindowHeader>
                    <WindowContent>
                        {props.children}
                    </WindowContent>
                </Window>
            </div>
        </Draggable>

    )
}

export default StandardWindow
