/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class Platform {
  public macOs(): boolean {
    return process.platform === "darwin"
  }

  public linux(): boolean {
    return process.platform === "linux"
  }

  public windows(): boolean {
    return process.platform === "win32"
  }
}

export const platform = new Platform()
