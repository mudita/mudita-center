/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"

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
  // FIXME: Using remote module in renderer process isn't a good pattern.
  //  You can read more in https://github.com/electron/remote#migrating-from-remote
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

const getAppPath = (...paths: string[]): string => {
  try {
    const appDataPath = resolve().app.getPath("appData");
    const baseAppPath = path.join(appDataPath, '@mudita', 'mudita-center-app');
    return path.join(baseAppPath, ...paths);
  } catch {
    return ""
  }
}

export default getAppPath
