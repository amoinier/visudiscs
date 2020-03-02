import gql from 'graphql-tag'

const typeDefs = gql`
type Query {
  getReleases(title: String, limit: Int = 10): [Release]
  getArtists(name: String, limit: Int = 10): [Artist]
  getLabels(name: String, limit: Int = 10): [Label]
}

type Release {
  discogs_id: Int
  title: String
  artist: Artist
  label: Label
  year: Int
  releases_date: String
  country: String
  notes: String
  images: [String]
}

type Artist {
  discogs_id: Int
  releases: [Release]
  name: String
  realname: String
  images: [String]
}

type Label {
  discogs_id: Int
  releases: [Release]
  name: String
  contact: String
  images: [String]
}

type Genre {
  id: Int
  name: String
}

type style {
  id: Int
  name: String
}
`

export default typeDefs
