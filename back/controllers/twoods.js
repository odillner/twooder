const Twood = require('../models/twood.js')

module.exports = {
    list: async (req, res, next) => {
        try {
            const twoods = await Twood
                .find({})

            res.json(twoods)
        } catch (err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        try {
            const user = req.authUser

            if (!user) {
                let err = new Error('Invalid token')
                err.name = 'AuthenticationError'
                throw err
            }

            const body = req.body

            const twood = new Twood(body)
            twood.user = user.id

            const newTwood = await twood.save()
            user.twoods = user.twoods.concat(newTwood._id)
            await user.save()

            res.status(201).json(newTwood)
        } catch (err) {
            next(err)
        }

    },

    read: async (req, res, next) => {
        try {
            const id = req.params.id

            const twood = await Twood.findById(id)

            if (!twood) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(twood)
            res.end()

        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const id = req.params.id
            const body = req.body

            const newTwood = await Twood.findOneAndUpdate(
                {_id: id},
                body,
                {new: true, useFindAndModify: false, runValidators: true}
            )

            if (!newTwood) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(newTwood)
            res.end()
        } catch (err) {
            next(err)
        }
    },

    remove: async (req, res, next) => {
        try {
            const id = req.params.id
            const user = req.authUser

            if (!user) {
                let err = new Error('Invalid token')
                err.name = 'AuthenticationError'
                throw err
            }

            const twood = await Twood.findById(id)

            if (!twood) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            if (user.id != twood.user) {
                let err = new Error('Invalid user')
                err.name = 'AuthenticationError'
                throw err
            }

            const deleted = await Twood.deleteOne({'_id':id})
            user.twoods = user.twoods.filter(twood => twood.id != deleted._id)
            await user.save()

            res.status(200).end()
        } catch (err) {
            next(err)
        }
    },
}