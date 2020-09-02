import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import StandardWindow from './StandardWindow'
import StandardTable from './StandardTable'
import {Profile} from '../components/Profile'

import {closeWindow} from '../reducers/windows'

export const SignInWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const SignUpWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const TwoodWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const TwoodsWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const RoomWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const RoomsWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const UserWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const UsersWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const OwnUserWindow = ({initialState, id}) => {
    const {user} = useSelector(state => state.session)
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Your Profile'>
            <Profile user={user}/>
        </StandardWindow>
    )
}

export const NewTwoodWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}

export const NewRoomWindow = ({initialState, id}) => {
    const dispatch = useDispatch()

    const close = () => {
        dispatch(closeWindow(id))
    }

    return (
        <StandardWindow title='Twoods' close={close}>
            <StandardTable initialState={initialState} type='twoods'/>
        </StandardWindow>
    )
}
