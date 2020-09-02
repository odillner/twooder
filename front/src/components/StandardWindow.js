import React from 'react'
import {Window, WindowHeader, WindowContent, Button} from 'react95'
import Draggable from 'react-draggable'
import {useDispatch, useSelector} from 'react-redux'

import CloseButton from './CloseButton'
import {closeWindow, selectWindow} from '../reducers/windows'
import {useHistory} from 'react-router-dom'

const StandardWindow = (props) => {
    const current = useSelector(state => state.windows.current)
    const dispatch = useDispatch()
    const history = useHistory()

    const close = () => {
        dispatch(closeWindow(props.id))
        history.push('/')
    }

    const getzIndex = () => {
        return (current===props.id) ? 15 : 11
    }

    const select = () => {
        dispatch(selectWindow(props.id))
    }

    return (
        <Draggable onMouseDown={() => select()} >
            <div
                style={{display: 'flex', justifyContent: 'center', position: 'absolute', zIndex: getzIndex()}}
            >
                <Window className='window'>
                    <WindowHeader className='window-header'>
                        {props.title}
                        <CloseButton onClose={close}/>
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
