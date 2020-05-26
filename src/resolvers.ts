import Releases from './Models/Release'
import Artists from './Models/Artist'
import Labels from './Models/Label'

const resolvers = {
  Query: {
    getReleases: async (obj: any, args: any, context: any, info: any) => {
      const query = Releases.query()
        .withGraphJoined('artist')
        .withGraphJoined('label')
        .withGraphJoined('genres')
        .withGraphJoined('styles')
        .withGraphJoined('tracklists')
        .limit(args.limit || 100)

      if (args.title) {
        query.where('title', '~', args.title)
      }

      console.log('%' + args.title + '%')

      return query
    },

    getArtists: async (obj: any, args: any, context: any, info: any) => {
      const query = Artists.query()
        .withGraphJoined('releases')
        .limit(args.limit || 100)

      if (args.title) {
        query.where('title', '~', args.title)
      }

      return query
    },

    getLabels: async (obj: any, args: any, context: any, info: any) => {
      const query = Labels.query()
        .withGraphJoined('releases')
        .limit(args.limit || 100)

      if (args.title) {
        query.where('title', '~', args.title)
      }

      return query
    }
  }
}

export default resolvers
