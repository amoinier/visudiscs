import Releases from './Models/Release'

const resolvers = {
  Query: {
    getReleases: async (obj: any, args: any, context: any, info: any) => {
      return Releases.query()
    }
  }
}

export default resolvers
