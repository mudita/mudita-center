const moment = require("moment-timezone")
moment.tz.setDefault("Europe/Warsaw")
jest.setMock("moment", moment)
