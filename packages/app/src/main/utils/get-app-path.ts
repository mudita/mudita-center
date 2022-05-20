/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import packageInfo from "../../../package.json"

export enum AppType {
  Main = "main",
  Renderer = "renderer",
}
export type AppResolver = () => {
  type: AppType
  app: { getPath: (arg0: string) => string }
}

export const resolve: AppResolver = () => {
  const isRenderer = require("is-electron-renderer")
  const app = isRenderer
    ? require("electron").remote.app
    : require("electron").app
  const type = isRenderer ? AppType.Renderer : AppType.Main
  return {
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
