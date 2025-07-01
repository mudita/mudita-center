/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

export class DrawerPage extends Page {
  public get deviceSelectDrawer() {
    return $("//*[@data-testid='device-select-drawer-content']")
  }

  public getDeviceOnDrawer(serialNumber: string) {
    return $(`//*[@data-testid='drawer-device-wrapper-${serialNumber}']`)
  }

  public get deviceImageOnDrawer() {
    return $("//*[@data-testid='drawer-device-image']")
  }

  public get drawerDeviceSerialNumber() {
    return $$("//*[@data-testid='drawer-device-serial-number-value']")
  }

  public get drawerDeviceName() {
    return $$("//*[@data-testid='drawer-device-type']")
  }
}

export default new DrawerPage()
