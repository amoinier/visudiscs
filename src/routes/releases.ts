import express, {NextFunction, Request, Response} from 'express'
import axios from 'axios'

import Artists from '../Models/Artist'
import Labels from '../Models/Label'
import Releases from '../Models/Release'

import response from '../utils/response'

const Router = express.Router()

Router.get('/', async (req: Request, res: any) => {
  const release: Releases[] = await Releases
    .query()
    .select('title', 'images', 'notes')
    .withGraphFetched('artist')
    .modifyGraph('artist', (builder: any) => { builder.select('name') })
    .withGraphJoined('label').modifyGraph('label', (builder: any) => { builder.select('name') })
    .withGraphJoined('genres')

  res.resp.datas = release

  return response(req, res)
})


export default Router