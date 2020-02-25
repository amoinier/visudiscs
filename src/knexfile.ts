const configKnex = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'test',
      database: 'visudisc'
    }
  },
  debug: true
}

export default configKnex