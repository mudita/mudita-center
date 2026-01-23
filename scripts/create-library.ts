/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { $ } from "execa"
import fs from "fs-extra"

const runScript = async () => {
  const { name, type, directory = "" } = mapArgs()

  const fullDirectory = directory ? `libs/${directory}` : "libs"

  switch (type) {
    case "main":
      await $`nx g @nx/react:library --directory=${fullDirectory}/${name}/main --name=${name}/main --unitTestRunner=jest --component=false --tags=process:main --no-interactive`
      await fs.mkdir(`${fullDirectory}/${name}/main/src/lib`)
      break
    case "renderer":
      await $`nx g @nx/react:library --directory=${fullDirectory}/${name}/renderer --name=${name}/renderer --unitTestRunner=jest --component=false --tags=process:renderer --no-interactive`
      await fs.mkdir(`${fullDirectory}/${name}/renderer/src/lib`)
      break
    case "feature":
      await $`nx g @nx/react:library --directory=${fullDirectory}/${name}/feature --name=${name}/feature --unitTestRunner=jest --component=false --tags=process:renderer --no-interactive`
      await fs.mkdir(`${fullDirectory}/${name}/feature/src/lib`)
      break
    case "routes":
      await $`nx g @nx/react:library --directory=${fullDirectory}/${name}/routes --name=${name}/routes --unitTestRunner=jest --component=false --tags=process:renderer --no-interactive`
      await fs.mkdir(`${fullDirectory}/${name}/routes/src/lib`)
      break
    case "ui":
      await $`nx g @nx/react:library --directory=${fullDirectory}/${name}/ui --name=${name}/ui --unitTestRunner=jest --component=false --tags=type:ui --no-interactive`
      await fs.mkdir(`${fullDirectory}/${name}/ui/src/lib`)
      break
    case "models":
      await $`nx g @nx/js:library --directory=${fullDirectory}/${name}/models --name=${name}/models --unitTestRunner=jest --tags=type:models --no-interactive`
      await fs.mkdir(`${fullDirectory}/${name}/models/src/lib`)
      break
    case "utils":
      await $`nx g @nx/js:library --directory=${fullDirectory}/${name}/utils --name=${name}/utils --unitTestRunner=jest --tags=type:utils --no-interactive`
      await fs.mkdir(`${fullDirectory}/${name}/utils/src/lib`)
      break
  }
}
void runScript()

const mapArgs = () => {
  return process.argv
    .slice(2)
    .map((arg) => {
      const [type, value] = arg
        .split("=")
        .map((str) => str.trim().replace(/-/g, ""))
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
