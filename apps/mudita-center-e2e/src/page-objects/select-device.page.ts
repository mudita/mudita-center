/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class SelectDevicePage extends Page {
  public get devicesList() {
    return $("[data-testid='devices-list']")
  }
  public get availableDevice() {
    return $$('[data-testid="available-device"]')
  }
  public get selectDeviceSerialNumber() {
    return $$('[data-testid="available-device-serial-number"]')
  }
  public get selectDeviceName() {
    return $$('[data-testid="available-device-name"]')
  }
  public get selectADeviceToContinueTitle() {
    return $("h1*=Select a device to continue")
  }
  public getDeviceOnSelectModal(serialNumber: string) {
    return $(
      `//*[@data-testid="available-device-serial-number-${serialNumber}"]`
    )
  }
}
export default new SelectDevicePage()
