import React from 'react'
import {Window, WindowHeader, WindowContent} from 'react95'
import Draggable from 'react-draggable'
import {useDispatch, useSelector} from 'react-redux'

import CloseButton from './CloseButton'
import {closeWindow, selectWindow, updateWindowPosition} from '../reducers/windows'
import {useHistory} from 'react-router-dom'

const StandardWindow = (props) => {
    const id = props.id
    const {current, last, items} = useSelector(state => state.windows)
    const item = items.find(item => item.id === id)
    const dispatch = useDispatch()
    const history = useHistory()

    const close = () => {
        dispatch(closeWindow(id))

        if (last===id) {
            history.push('/')
        }
    }

    const getzIndex = () => {
        return (current===id) ? 15 : 11
    }

    const select = () => {
        dispatch(selectWindow(id))
    }

    /* HORRIBLE FOR PERFOMANCE, SHITLOAD OF COMPONENTS ARE RERENDERED A BILLION TIMES FIXXXX PLEASE */
    const drag = (e, position) => {
        const {x, y} = position
        dispatch(updateWindowPosition(item, x, y))
    }

    return (
        <Draggable
            position={{x: item.x, y: item.y}}
            cancel='strong'
            onMouseDown={() => select()}
            onDrag={drag}
        >
            <div
                style={{display: 'flex', justifyContent: 'center', position: 'absolute', zIndex: getzIndex()}}
            >
                <Window className='window'>
                    <WindowHeader className='window-header'>
                        {props.title}
                        <CloseButton onClose={close}/>
                    </WindowHeader>
                    <strong className="no-cursor">
                        <WindowContent>
                            {props.children}
                        </WindowContent>
                    </strong>
                </Window>
            </div>
        </Draggable>

    )
}

export default StandardWindow
