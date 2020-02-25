import express, {NextFunction, Request, Response} from 'express'
const axios = require('axios')

const Artists = require('../Models/Artist')
const Labels = require('../Models/Label')
const Releases = require('../Models/Release')

const response = require('../utils/response')

const Router = express.Router()

Router.get('/add/:user', async (req: Request, res: Response) => {
  const { user } = req.params
  const url = `https://api.discogs.com/users/${user}/collection/folders/0/releases?per_page=1000&token=${process.env.DISCOGS_TOKEN}`

  const result = await axios.get(url).catch((e: Error) => {
    console.log(e)
  })

  const arrayArtist: any[] = []
  const arrayLabel: any[] = []
  const arrayRelease: any[] = []

  result.data.releases.map((release: any) => {
    if (!arrayArtist.find(artist => parseInt(artist.discogs_id) === parseInt(release.basic_information.artists[0].id))) {
      arrayArtist.push({
        name: release.basic_information.artists[0].name,
        discogs_id: parseInt(release.basic_information.artists[0].id)
      })
    }

    if (!arrayLabel.find(label => parseInt(label.discogs_id) === parseInt(release.basic_information.labels[0].id))) {
      arrayLabel.push({
        name: release.basic_information.labels[0].name,
        discogs_id: release.basic_information.labels[0].id
      })
    }

    if (!arrayRelease.find(rel => parseInt(rel.discogs_id) === parseInt(release.id))) {
      arrayRelease.push({
        title: release.basic_information.title,
        discogs_id: release.id,
        artist_id: parseInt(release.basic_information.artists[0].id),
        label_id: parseInt(release.basic_information.labels[0].id)
      })
    }
  })

  await Artists.query().upsertGraph(arrayArtist, { allowRefs: true, relate: true, insertMissing: true }).catch((e: Error) => console.log(e))
  await Labels.query().upsertGraph(arrayLabel, { allowRefs: true, relate: true, insertMissing: true }).catch((e: Error) => console.log(e))
  await Releases.query().upsertGraph(arrayRelease, { allowRefs: true, relate: true, insertMissing: true }).catch((e: Error) => console.log(e))

  return response(req, res)
})

Router.get('/get', async (req: any, res: any) => {
  // const release = await Releases.query().where('title', 'like', '%Jeannine%').withGraphJoined('artist').withGraphJoined('label').withGraphFetched('genres')
  const release = await Releases
    .query()
    .select('title')
    .withGraphFetched('artist')
    .modifyGraph('artist', (builder: any) => { builder.select('name') })
    .withGraphJoined('label').modifyGraph('label', (builder: any) => { builder.select('name') })
    .withGraphJoined('genres')

  res.resp.datas = release

  return response(req, res)
})

module.exports = Router
