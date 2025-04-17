const { execSync } = require("child_process")
const getPortSync = require("get-port-sync")

const args = process.argv.slice(2).join(" ")
const port = getPortSync()
console.log(`Starting WebDriverIO on port ${port} with args: ${args}`)
const command = `cross-env WDIO_PORT=${port} npx wdio run wdio.conf.ts ${args}`

execSync(command, { stdio: "inherit" })
