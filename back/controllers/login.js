const bcrypt = require('bcrypt')

const User = require('../models/user')
const tokenHelper = require('../middleware/tokenHelper')

module.exports = {
    auth: async (req, res, next) => {
        try {
            const body = req.body

            const user = await User
                .findOne({username: body.username})
                .populate('twoods') /* populated so that twoods can be loaded without separete request */

            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(body.password, user.passwordHash)

            if (!(user && passwordCorrect)) {
                let err = new Error('Username or password incorrect')
                err.name = 'AuthorizationError'
                throw err
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            const token = tokenHelper.sign(userForToken)

            res
                .status(200)
                .send({token, user})

        } catch (err) {
            next(err)
        }
    }
}