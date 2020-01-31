const Router = require('express').Router()
const axios = require('axios')

const Artists = require('../Models/Artist')
const Labels = require('../Models/Label')
const Releases = require('../Models/Release')

const response = require('../utils/response')

Router.get('/:user', async (req, res, next) => {
  const { user } = req.params
  const url = `https://api.discogs.com/users/${user}/collection/folders/0/releases?per_page=1000&token=${process.env.DISCOGS_TOKEN}`
  console.log(user)
  console.log(url)

  const result = await axios.get(url).catch(e => {
    console.log(e)
  })

  const arrayArtist = []
  const arrayLabel = []

  const arrayRelease = result.data.releases.map((release) => {
    if (!arrayArtist.find(artist => artist.discogs_id === release.basic_information.artists[0].id)) {
      arrayArtist.push({
        name: release.basic_information.artists[0].name,
        discogs_id: parseInt(release.basic_information.artists[0].id)
      })
    }

    if (!arrayLabel.find(label => label.discogs_id === release.basic_information.labels[0].id)) {
      arrayLabel.push({
        name: release.basic_information.labels[0].name,
        discogs_id: release.basic_information.labels[0].id
      })
    }

    return {
      title: release.basic_information.title,
      discogs_id: release.id,
      artist_id: parseInt(release.basic_information.artists[0].id),
      label_id: parseInt(release.basic_information.labels[0].id)
    }
  })

  const insertArtist = await Artists.query().upsertGraph(arrayArtist, { allowRefs: true, relate: true }).catch(e => console.log(e))
  const insertLabel = await Labels.query().upsertGraph(arrayLabel, { allowRefs: true, relate: true }).catch(e => console.log(e))
  const insertRelease = await Releases.query().upsertGraph(arrayRelease, { allowRefs: true, relate: true }).catch(e => console.log(e))

  console.log(insertArtist)
  console.log(insertLabel)
  console.log(insertRelease)

  return response(req, res)
})

module.exports = Router
