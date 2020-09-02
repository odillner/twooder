import SignUp from './SignUp'
import SignIn from './SignIn'
import OwnUser from './OwnUser'
import {Users, SingleUser} from './Users'
import {Twoods, SingleTwood, NewTwood} from './Twoods'
import {Rooms, SingleRoom, NewRoom} from './Rooms'

export const windowIndex = {
    signin: SignIn,
    signup: SignUp,
    twood: SingleTwood,
    twoods: Twoods,
    newtwood: NewTwood,
    room: SingleRoom,
    rooms: Rooms,
    newroom: NewRoom,
    user: SingleUser,
    users: Users,
    ownuser: OwnUser
}
