import React from 'react'
import TwoodList from './Twood'
import {Link} from 'react-router-dom'

export const Profile = ({user}) => {
    if (user) {
        return (
            <div className='profile'>
                <h1>profile</h1>
                <p>username: {user.username} </p>
                <p>id: {user.id} </p>
                <div>
                    <TwoodList twoods={user.twoods}/>
                </div>
            </div>
        )
    }

    return (
        <div/>
    )
}

export const ProfileList = ({users}) => {
    if (!users) {
        return (<div/>)
    }
    return (
        <div>
            {users.map(user => {
                return (
                    <div key={user.id} className='profile'>
                        <Link to={`/users/${user.id}`}>
                            <h1>profile</h1>
                            <p>username: {user.username} </p>
                        </Link>
                        <p>id: {user.id} </p>
                    </div>
                )
            })}
        </div>
    )
}
