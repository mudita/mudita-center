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
}
export default new OverviewKompaktPage()
