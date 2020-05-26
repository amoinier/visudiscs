import express, { NextFunction, Request, Response } from 'express'
import { GraphQLScalarType, defaultFieldResolver } from 'graphql'
import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-express'
import dotenv from 'dotenv'
import cors from 'cors'

import path from 'path'
import favicon from 'serve-favicon'

import api from './api'
import response, { ResponseResp } from './utils/response'
import typeDefs from './schema'
import resolvers from './resolvers'

const app = express()

dotenv.config()

app.use(require('body-parser').json({ limit: '1mb' }))
app.use(cors())
app.use(favicon(path.join('./', 'public', 'favicon.ico')))

app.use((req: Request, res: any, next: NextFunction) => {
  res.resp = res.resp || {}

  return next()
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    headers: req.headers
  }),
  tracing: true
})

server.applyMiddleware({ app })

app.use('/api', api)

app.use((req: any, res: any, next: any) => {
  res.resp = { status: 404 }

  return next('Page not found')
})

app.use((err: any, req: any, res: any) => {
  res.resp = { status: res.resp && res.resp.status ? res.resp.status : 500, message: err || 'error' }

  return response(req, res)
})

app.listen(process.env.PORT, (): void => {
  console.log('listening on 3000')
})
