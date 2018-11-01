require('dotenv').config()

const app = require('./config/app')
require('./config/database')

require('./models/user')