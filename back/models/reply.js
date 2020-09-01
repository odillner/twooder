const mongoose = require('mongoose')

const replySchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

replySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.date
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Reply', replySchema)






