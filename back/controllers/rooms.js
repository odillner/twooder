const Room = require('../models/user.js')

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const rooms = await Room
                .find({})

            res.json(rooms)
        } catch (err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body

            const room = new Room(body)

            const result = await room.save()

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    },

    getById: async (req, res, next) => {
        try {
            const id = req.params.id

            const room = await Room
                .findById(id)
                .populate('twoods')

            if (!room) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(room)
        } catch (err) {
            next(err)
        }
    },

    getByName: async (req, res, next) => {
        try {
            const name = req.params.name

            const room = await Room
                .findOne({name:name})

            if (!room) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(room)
        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const id = req.params.id
            const body = req.body

            const room = await Room
                .findOneAndUpdate({_id: id}, body, {new: true, useFindAndModify: false, runValidators: true})

            if (!room) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(room)
        } catch (err) {
            next(err)
        }
    },

    remove: async (req, res, next) => {
        try {
            const id = req.params.id

            const room = await Room
                .findById(id)

            if (!room) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            await Room
                .deleteOne({'_id':id})

            res.status(200).end()
        } catch (err) {
            next(err)
        }
    },


}