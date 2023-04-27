const path = require("path")

require("dotenv").config({ path: path.join(__dirname, "../../.env") })

global.__static = path.join(__dirname, "/static").replace(/\\/g, "\\\\")

process.env.FEATURE_TOGGLE_ENVIRONMENT='development'
