const app = require('express')()
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const favicon = require('serve-favicon')

const api = require('./src/api')
const response = require('./src/utils/response')
const createDatabase = require('./src/utils/createDatabase')

dotenv.config()

createDatabase().catch(e => {})

app.use(require('body-parser').json({ limit: '1mb' }))
app.use(cors())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use((req, res, next) => {
  res.resp = res.resp || {}

  return next()
})

app.use('/api', api)

app.use((req, res, next) => {
  res.resp = { status: 404 }

  return next('Page not found')
})

app.use((err, req, res) => {
  res.resp = { status: res.resp && res.resp.status ? res.resp.status : 500, message: err || 'error' }

  console.log('1')

  return response(req, res)
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
