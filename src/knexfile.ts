module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'test',
      database: 'visudiscs'
    },
    migrations: {
      directory: '../src/migrations'
    }
  },
  debug: true
}