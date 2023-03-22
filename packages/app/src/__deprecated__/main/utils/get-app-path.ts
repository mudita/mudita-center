/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import packageInfo from "../../../../package.json"

export enum AppType {
  Main = "main",
  Renderer = "renderer",
}
export type AppResolver = () => {
  type: AppType
  app: { getPath: (arg0: string) => string }
}

export const resolve: AppResolver = () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isRenderer = require("is-electron-renderer")
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const app = isRenderer
    ? // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      require("@electron/remote").app
    : // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      require("electron").app
  const type = isRenderer ? AppType.Renderer : AppType.Main
  return {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    app,
    type,
  }
}

const getAppPath = (): string => {
  try {
    return path.join(resolve().app.getPath("appData"), packageInfo.name)
  } catch {
    return ""
  }
}

export default getAppPath
