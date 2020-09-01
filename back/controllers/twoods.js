const User = require('../models/user.js')
const Twood = require('../models/twood.js')

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const twoods = await Twood
                .find({})

            res.json(twoods)
        } catch (err) {
            next(err)
        }
    },

    getByUser: async (req, res, next) => {
        try {
            const id = req.params.id

            const user = await User
                .findById(id)
                .populate('twoods')

            if (!user) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(user.twoods)
        } catch (err) {
            next(err)
        }
    },

    getById: async (req, res, next) => {
        try {
            const id = req.params.id

            Twood.deleteMany({})

            const twood = await Twood
                .findById(id)
                .populate('user')
                .populate('replies')

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

    update: async (req, res, next) => {
        try {
            const id = req.params.id
            const body = req.body

            const newTwood = await Twood.findOneAndUpdate(
                {_id: id},
                body,
                {new: true, useFindAndModify: false, runValidators: true}
            ).populate('user')


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

    like: async (req, res, next) => {
        try {
            const id = req.params.id
            const user = req.authUser

            if (!user) {
                let err = new Error('Invalid token')
                err.name = 'AuthenticationError'
                throw err
            }

            const twoodToLike = await Twood.findById(id)

            if (!twoodToLike) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            twoodToLike.likes++
            const newTwood = await twoodToLike.save()

            res.json(newTwood)
            res.end()
        } catch (err) {
            next(err)
        }
    },

    reply: async (req, res, next) => {
        try {
            const id = req.params.id
            const user = req.authUser
            const body = {...req.body, replyTo: id}

            if (!user) {
                let err = new Error('Invalid token')
                err.name = 'AuthenticationError'
                throw err
            }

            const twoodToReplyTo = await Twood.findById(id)

            if (!twoodToReplyTo) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            const twood = new Twood(body)

            twood.user = user.id

            const newTwood = await twood.save()
            user.twoods = user.twoods.concat(newTwood._id)
            await user.save()

            twoodToReplyTo.replies = twoodToReplyTo.replies.concat(newTwood._id)
            await twoodToReplyTo.save()

            res.status(201).json(newTwood)
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

            /* removes twood from user list of twoods */
            const deleted = await Twood.deleteOne({'_id':id})
            user.twoods = user.twoods.filter(twood => twood.id != deleted._id)
            await user.save()

            /* removes twood from list of replies */
            if (deleted.replyTo) {
                const replyTo = await Twood.findById(deleted.replyTo)
                replyTo.replies = replyTo.replies.filter(twood => twood.id != deleted._id)
                await replyTo.save()
            }

            res.status(200).end()
        } catch (err) {
            next(err)
        }
    },
}