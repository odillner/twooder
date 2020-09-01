import React from 'react'
import {Link} from 'react-router-dom'
import {Window, WindowHeader, WindowContent, Button} from 'react95'

import CloseIcon from './CloseIcon'

const StandardWindow = (props) => {
    return (
        <Window className='window'>
            <WindowHeader className='window-header'>
                {props.title}
                <Link to="/">
                    <Button style={{float: 'right', margin: '3px'}}>
                        <CloseIcon/>
                    </Button>
                </Link>
            </WindowHeader>
            <WindowContent>
                {props.children}
            </WindowContent>
        </Window>
    )
}

export default StandardWindow
