/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OverviewPage } from "./overview.page"

class OverviewKompaktPage extends OverviewPage {
  public get aboutYourDevice() {
    return $('[data-testid="button-text-summary-about"]')
  }

  public get sarInformationButtonKompakt() {
    return $('[data-testid="button-text_sarmodal-button"]')
  }

  public get sarInformationPopup() {
    return $("/html/body/div[10]/div/div")
  }

  public get kompaktImageElement() {
    return $('//div[@data-testid="generic-view-image"]')
  }

  public get backupInfo() {
    return $(`//div[@componentkey="backupbackup-info"]/p`)
  }
  public get serialNumberLabel() {
    return $(`//div[@componentkey="summary-serial-number"]/p[1]`)
  }

  public get serialNumberValue() {
    return $(`//div[@componentkey="summary-serial-number"]/p[2]`)
  }

  public get kompaktImage() {
    return $('[data-testid="generic-view-image"]')
  }

  public get kompaktSignalIcon() {
    return $('[data-testid="icon-network-signal-2"]')
  }

  public get kompaktNetworkName() {
    return $('[data-testid="icon-text"]')
  }

  public get kompaktBatteryIcon() {
    return $('//div[@data-testid="icon-battery-charging-2"]')
  }

  public get kompaktBatteryLevelValue() {
    return $('//h3[text()="Status"]/..//h4[@data-testid="icon-text"]')
  }

  public get kompaktSimCard1() {
    return $('[data-testid="icon-subtext"]')
  }

  public get kompaktOsVersion() {
    return $('[data-testid="version"]')
  }

  public get kompaktOsVersionLabel() {
    return $('[data-testid="version-label"]')
  }
}
export default new OverviewKompaktPage()
