/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { $ } from "execa"
import fs from "fs-extra"

const run = async () => {
  try {
    const { name, type, directory = "" } = mapArgs()
    if (!name || !type) {
      throw new Error(
        `\nPlease provide both "name" and "type" arguments.\nExample: npm run create-library name=my-lib type=ui`
      )
    }
    const fullName = directory
      ? `${directory}/${name}/${type}`
      : `${name}/${type}`

    console.log(`Creating a new "${fullName}" library...`)
    await runScript(type, fullName)
    console.log(`Library created successfully!`)
  } catch (error) {
    console.error("Error creating library!\n", error.stdout || error.message)
  }
}

const mapArgs = () => {
  return process.argv
    .slice(2)
    .map((arg) => {
      const [type, value] = arg.split("=").map((str, i) => {
        if (i === 0) {
          return str.trim().replace(/-/g, "")
        }
        return str
      })
      switch (type) {
        case "n":
        case "name":
          return { name: value }
        case "t":
        case "type":
          return { type: value }
        case "d":
        case "directory":
          return { directory: value }
        default:
          return {}
      }
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

const runScript = async (type: string, fullName: string) => {
  let tags = ""
  switch (type) {
    case "main":
      tags = "process:main"
      break
    case "renderer":
      tags = "process:renderer"
      break
    case "feature":
      tags = "process:renderer"
      break
    case "routes":
      tags = "process:renderer"
      break
    case "ui":
      tags = "type:ui"
      break
    case "models":
      tags = "type:models"
      break
    case "utils":
      tags = "type:utils"
      break
    default:
      throw new Error(`Unknown library type: ${type}`)
  }
  await $`nx g @nx/react:library --directory=libs/${fullName} --name=${fullName} --unitTestRunner=jest --component=false --tags=${tags} --no-interactive`
  await fs.mkdir(`libs/${fullName}/src/lib`)
}

void run()
