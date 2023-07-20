const fs = require("fs")
const os = require("os")
const path = require("path")

const envFilePath = path.resolve(__dirname, "../electron-builder.env")

const readEnvVars = () => fs.readFileSync(envFilePath, "utf-8").split(os.EOL)

const setEnvValue = (key, value) => {
  const envVars = readEnvVars()
  const targetLine = envVars.find((line) => line.split("=")[0] === key)
  if (targetLine !== undefined) {
    const targetLineIndex = envVars.indexOf(targetLine)
    envVars.splice(targetLineIndex, 1, `${key}=${value}`)
  } else {
    envVars.push(`${key}=${value}`)
  }
  fs.writeFileSync(envFilePath, envVars.join(os.EOL))
}

setEnvValue("BUILD_YEAR", new Date().getFullYear())
