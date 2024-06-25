/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import { OverviewPage } from "./overview.page"

class OverviewKompaktPage extends OverviewPage {
  public get aboutYourDevice() {
    return $("p*=About your device")
  }

  public get kompaktImageElement() {
    return $(
      "#app > div.sc-hrCmsx.iRrrLX > div.sc-gtWJRm.fLIlvh > div.box-sizing-wrapper > div > div > div.sc-eGXPLf.bfaTWN > div > div.sc-eGXPLf.eAMdLd > img"
    )
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
    return $('[data-testid="image"]')
  }

  public get kompaktSignalIcon() {
    return $('[data-testid="icon-network-signal-2"]')
  }

  public get kompaktNetworkName() {
    return $('[data-testid="icon-text"]')
  }

  public get kompaktBatteryLevel() {
    return $('//div[@data-testid="icon-battery-charging-2"]')
  }

  public get kompaktBatteryLevelValue() {
    return $('//h3[text()="Status"]/..//h4[@data-testid="icon-text"]')
  }

  public get kompaktSimCard1() {
    return $('[data-testid="icon-subtext"]')
  }
}
export default new OverviewKompaktPage()
