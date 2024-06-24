/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ChainablePromiseElement } from "webdriverio"
import OverviewPage from "./overview.page"

class OverviewKompaktPage extends OverviewPage {}

public get aboutYourDevice(): ChainablePromiseElement<
Promise<WebdriverIO.Element>
> {
return $("p*=About your device")
}

public get kompaktImageElement(): ChainablePromiseElement<
Promise<WebdriverIO.Element>
> {
return $(
  "#app > div.sc-hrCmsx.iRrrLX > div.sc-gtWJRm.fLIlvh > div.box-sizing-wrapper > div > div > div.sc-eGXPLf.bfaTWN > div > div.sc-eGXPLf.eAMdLd > img"
)
}

public get backupInfo(): ChainablePromiseElement<
Promise<WebdriverIO.Element>
> {
return $(
  "#app > div.sc-hrCmsx.iRrrLX > div.sc-gtWJRm.fLIlvh > div.box-sizing-wrapper > div > div > div.sc-eGXPLf.crpuMj > div > div > div > p"
)
}

export default new OverviewKompaktPage()
