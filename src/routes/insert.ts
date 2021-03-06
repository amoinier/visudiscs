import express, {NextFunction, Request, Response} from 'express'
import axios from 'axios'

import Artists from '../Models/Artist'
import Labels from '../Models/Label'
import Releases from '../Models/Release'

import response from '../utils/response'

const Router = express.Router()

Router.post('/add/:user', async (req: Request, res: Response) => {
  const { user } = req.params
  const url: string = `https://api.discogs.com/users/${user}/collection/folders/0/releases?per_page=1000&token=${process.env.DISCOGS_TOKEN}`

  const result: any = await axios.get(url).catch((e: Error) => {console.log(e)})

  console.log('xxx');

  const arrayArtist: any[] = []
  const arrayLabel: any[] = []
  const arrayRelease: any[] = []

  response(req, res)

  for (const release of result.data.releases) {
    const url: string = `https://api.discogs.com/releases/${release.id}?token=${process.env.DISCOGS_TOKEN}`
    const releaseInfo: any = await axios.get(url).catch((e: Error) => {console.log(e)})

    if (releaseInfo && releaseInfo.data) {
      releaseInfo.data.artists.map(async (artist: any) => {
        if (!arrayArtist.find(saveArtist => parseInt(saveArtist.discogs_id) === parseInt(artist.id))) {
          arrayArtist.push({
            name: artist.name,
            discogs_id: parseInt(artist.id),
            images: [artist.thumbnail_url]
          })
        }
      })

      releaseInfo.data.labels.map(async (label: any) => {
        if (!arrayLabel.find(saveLabel => parseInt(saveLabel.discogs_id) === parseInt(label.id))) { 
          arrayLabel.push({
            name: label.name,
            discogs_id: label.id,
            images: [label.thumbnail_url]
          })
        }
      })

      if (!arrayRelease.find(rel => parseInt(rel.discogs_id) === parseInt(release.id))) {
        arrayRelease.push({
          title: releaseInfo.data.title,
          discogs_id: release.id,
          artist_id: parseInt(releaseInfo.data.artists[0].id),
          label_id: parseInt(releaseInfo.data.labels[0].id),
          year: parseInt(releaseInfo.data.year),
          released_date: releaseInfo.data.released,
          country: releaseInfo.data.country,
          notes: releaseInfo.data.notes || '',
          images: releaseInfo.data.images ? releaseInfo.data.images.map((image: any) => image.uri) : [],
          styles: releaseInfo.data.styles ? releaseInfo.data.styles.map((style: any) => {return {name: style}}) : [],
          genres: releaseInfo.data.genres ? releaseInfo.data.genres.map((genre: any) => {return {name: genre}}) : [],
          tracklists: releaseInfo.data.tracklist ? releaseInfo.data.tracklist.map((tracklist: any) => {return {
            release_id: release.id,
            title: tracklist.title,
            type: tracklist.type_,
            position: tracklist.position,
            duration: tracklist.duration
          }}) : []
        })
      }
    }
    await delay(400)
  }

  console.log(arrayRelease);

  await Artists.query().upsertGraph(arrayArtist, { allowRefs: true, relate: true, insertMissing: true }).catch((e: Error) => console.log(e))
  await Labels.query().upsertGraph(arrayLabel, { allowRefs: true, relate: true, insertMissing: true }).catch((e: Error) => console.log(e))
  await Releases.query().upsertGraph(arrayRelease, { allowRefs: true, relate: true, insertMissing: true }).catch((e: Error) => console.log(e))

  return
})

const delay = (ms: number) => {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export default Router
