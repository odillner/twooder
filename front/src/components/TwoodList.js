import React from 'react'

export const Twood = ({twood}) => {
    return (
        <div className='twood'>
            {twood.content}
        </div>
    )
}

export const TwoodList = ({twoods}) => {
    return (
        <div>
            {twoods.map(twood => {
                return (
                    <Twood key={twood.id} twood={twood}/>
                )
            })}
        </div>
    )
}

export default TwoodList