const Router = require('express').Router()

const insert = require('./routes/insert.js')

Router.use('/insert', insert)

module.exports = Router
