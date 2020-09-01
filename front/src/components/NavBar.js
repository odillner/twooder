import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {endSession} from '../reducers/session'

import {AppBar, Toolbar, Button, List, ListItem, Divider} from 'react95'

const NavBar = () => {
    const user = useSelector(state => state.session.user)

    const [mainOpen, setMainOpen] = useState(false)
    const [secondaryOpen, setSecondaryOpen] = useState(false)

    return(
        <AppBar style={{position: 'relative', zIndex: 1000}}>
            <Toolbar style={{justifyContent: 'space-between'}}>

                {/* main drop down */}
                <div style={{position: 'relative', display: 'inline-block'}}>
                    <Button
                        onClick={() => setMainOpen(!mainOpen)}
                        active={mainOpen}
                        style={{fontWeight: 'bold'}}
                    >
                        <img
                            alt='logo'
                            style={{height: '20px', marginRight: 4}}
                        />
                        Twooder
                    </Button>
                    {mainOpen && <MainDropDown setOpen={setMainOpen}/>}
                </div>

                {/* secondary drop down */}
                {user ?
                    <div style={{position: 'relative', display: 'inline-block'}}>
                        <Button
                            onClick={() => setSecondaryOpen(!secondaryOpen)}
                            active={secondaryOpen}
                            style={{fontWeight: 'bold'}}
                        >
                            {user.username}
                        </Button>
                        {secondaryOpen && <SecondaryDropDown setOpen={setSecondaryOpen}/>}
                    </div>
                    :
                    <Link to="/signin">
                        <div style={{position: 'relative', display: 'inline-block'}}>
                            <Button
                                style={{fontWeight: 'bold'}}
                            >
                                Sign In
                            </Button>
                        </div>
                    </Link>
                }
            </Toolbar>
        </AppBar>
    )
}


const MainDropDown = ({setOpen}) => {
    return (
        <List
            style={{
                position: 'absolute',
                left: '0',
                top: '100%'
            }}
            onClick={() => setOpen(false)}
        >
            <Link to="/">
                <ListItem>
                    <span role='img'>
                        ✉️
                    </span>
                    Home
                </ListItem>
            </Link>
            <Divider />
            <Link to="/twoods">
                <ListItem>
                    <span role='img'>
                        ✉️
                    </span>
                    Twoods
                </ListItem>
            </Link>
            <Link to="/users">
                <ListItem>
                    <span role='img'>
                        👨‍💻
                    </span>
                    Users
                </ListItem>
            </Link>
            <Link to="/rooms">
                <ListItem>
                    <span role='img'>
                        📁
                    </span>
                     Rooms
                </ListItem>
            </Link>
        </List>
    )
}

const SecondaryDropDown = ({setOpen}) => {
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(endSession())
    }
    return (
        <List
            style={{
                position: 'absolute',
                right: '0',
                top: '100%'
            }}
            onClick={() => setOpen(false)}
        >
            <Link to="/user">
                <ListItem>
                    <span role='img'>
                        👨‍💻
                    </span>
                    Profile
                </ListItem>
            </Link>
            <Divider />
            <Link to="/newtwood">
                <ListItem>
                    <span role='img'>
                        📁
                    </span>
                    Create Twood
                </ListItem>
            </Link>
            <Link to="/newroom">
                <ListItem>
                    <span role='img'>
                        📁
                    </span>
                    Create Room
                </ListItem>
            </Link>
            <Divider />
            <ListItem onClick={() => signOut()}>
                <span role='img' aria-label='🔙'>
                    🔙
                </span>
                Sign Out
            </ListItem>
        </List>
    )
}

export default NavBar
