import React from 'react'

import {Panel, Bar, Toolbar, Button, List, ListItem, Divider} from 'react95'

const Footer = () => {
    return(
        <div style={{position: 'fixed', bottom: '0', left: '0', width: '100%', zIndex: 1000}}>
            <Panel
                variant='outside'
                shadow
                style={{padding: '1rem', lineHeight: '1.5', width: '100%',}}
            >
            </Panel>
        </div>
    )
}

export default Footer
