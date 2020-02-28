import { Router as router } from 'express'

import insert from './routes/insert'
import releases from './routes/releases'

const Router = router()

Router.use('/insert', insert)
Router.use('/releases', releases)

export default Router
