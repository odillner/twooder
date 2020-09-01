import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Window, WindowHeader, WindowContent, Button} from 'react95'
import Draggable from 'react-draggable'

import CloseIcon from './CloseIcon'

const StandardWindow = (props) => {
    const [open, setOpen] = useState(true)

    if (!open) return null

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Draggable>
                <Window className='window'>
                    <WindowHeader className='window-header'>
                        {props.title}
                        <Button
                            style={{float: 'right', margin: '3px'}}
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon/>
                        </Button>
                    </WindowHeader>
                    <WindowContent>
                        {props.children}
                    </WindowContent>
                </Window>
            </Draggable>
        </div>
    )
}

export default StandardWindow
