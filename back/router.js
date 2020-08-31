const twoods = require('./controllers/twoods')
const users = require('./controllers/users')
const rooms = require('./controllers/rooms')
const login = require('./controllers/login')

module.exports = (app) => {
    app.route('/api/twoods')
        .get(twoods.getAll)
        .post(twoods.create)

    app.route('/api/twoods/:id')
        .get(twoods.getById)
        .put(twoods.update)
        .delete(twoods.remove)

    app.route('/api/twoods/:id/reply')
        .post(twoods.reply)

    app.route('/api/twoods/:id/like')
        .post(twoods.like)

    app.route('/api/twoods/user/:id')
        .get(twoods.getByUser)

    app.route('/api/users')
        .get(users.getAll)
        .post(users.create)

    app.route('/api/users/:id')
        .get(users.getById)
        .put(users.update)
        .delete(users.remove)

    app.route('/api/rooms')
        .get(rooms.getAll)
        .post(rooms.create)

    app.route('/api/rooms/:id')
        .get(rooms.getById)
        .put(rooms.update)
        .delete(rooms.remove)

    app.route('/api/login/')
        .post(login.auth)
}
