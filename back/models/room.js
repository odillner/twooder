const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 20,
    },
    twoods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Twood'
        }
    ],
})

roomSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

roomSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Room', roomSchema)






