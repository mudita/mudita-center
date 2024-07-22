/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

export class DrawerPage extends Page {
  public get deviceSelectDrawer() {
    return $('[data-testid="device-select-drawer-content"]')
  }

  public getDeviceOnDrawer(serialNumber: string) {
    return $(`//*[@data-testid="drawer-device-wrapper-${serialNumber}"]`)
  }
}

export default new DrawerPage()
