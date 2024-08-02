/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OverviewPage } from "./overview.page"

class OverviewKompaktPage extends OverviewPage {
  public get aboutYourDevice() {
    return $('[data-testid="button-text_summary-about"]')
  }

  public get sarInformationButtonKompakt() {
    return $('[data-testid="button-text_sarmodal-button"]')
  }

  public get sarInformationPopup() {
    return $('[data-testid="button-text_sarmodal-button"]')
  }

  public get sarInformationPopupCloseButton() {
    return $('[data-testid="icon-close"]')
  }

  public get backArrowButton() {
    return $('[data-testid="icon-ArrowLongLeft"]')
  }

  public get backupInfo() {
    return $(`//div[@data-testid="block-box-backup"]//p`)
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

  public getStatusRow(rowIndex: number) {
    return $(
      `(//div[@data-testid="block-box-status"]/..//h4[@data-testid="icon-text"])[${rowIndex}]`
    )
  }

  public get kompaktNetworkName() {
    return this.getStatusRow(2)
  }

  public get kompaktBatteryIcon() {
    return $('//div[@data-testid="icon-battery-charging-5"]')
  }

  public get kompaktBatteryLevelValue() {
    return this.getStatusRow(1)
  }

  public get kompaktSimCard1Subtext() {
    return this.getStatusRow(2).$(`//*[@data-testid="icon-subtext"]`)
  }

  public get kompaktOsVersion() {
    return $('[data-testid="version"]')
  }

  public get kompaktOsVersionLabel() {
    return $('[data-testid="version-label"]')
  }
}
export default new OverviewKompaktPage()
