const path = require("path")
const fs = require("fs-extra")

const loader = function (content) {
  const modulePath = this._module.rawRequest.replace(".stories.tsx", ".json")
  const filePath = path.join(__dirname, `./tmp/${modulePath}`)

  if (!fs.existsSync(filePath)) {
    fs.createFileSync(filePath)
  }

  fs.writeJsonSync(filePath, { code: `${content}` })
  return content
}

module.exports = loader
