const Router = require('express').Router()

const insert = require('./routes/insert')

Router.use('/insert', insert)

export default Router
