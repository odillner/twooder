import React from 'react'
import {useSelector} from 'react-redux'

import {windowIndex} from './components/windows/'

function WindowRenderer() {
    const windows = useSelector(state => state.windows)

    return (
        <div style={{position: 'relative'}}>
            {windows.items.map(item => {
                const Component = windowIndex[item.type]

                return (
                    <Component
                        key={item.id}
                        initialState={item.initialState}
                        id={item.id}
                    />
                )
            })}
        </div>
    )
}

export default WindowRenderer
