import gql from 'graphql-tag'

const typeDefs = gql`
type Query {
  getReleases: [Release]
}

type Release {
  title: String
}
`

export default typeDefs
