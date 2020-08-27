const twoods = require('./controllers/twoods')
const users = require('./controllers/users')
const login = require('./controllers/login')

module.exports = (app) => {
    app.route('/api/twoods')
        .get(twoods.list)
        .post(twoods.create)

    app.route('/api/twoods/:id')
        .get(twoods.read)
        .put(twoods.update)
        .delete(twoods.remove)

    app.route('/api/users')
        .get(users.getAll)
        .post(users.create)

    app.route('/api/users/:id')
        .get(users.getById)
        .put(users.update)
        .delete(users.remove)

    app.route('/api/login/')
        .post(login.auth)
}
