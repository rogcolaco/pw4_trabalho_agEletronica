const bodyParser = require('body-parser')
const cors = require('cors')

module.export = app => {
    app.use(bodyParser.json)
    app.use(cors)
}
