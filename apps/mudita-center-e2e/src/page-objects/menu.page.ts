/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

export class Menu extends Page {
  public get overview() {
    return $(`//a[@href="#/generic/mc-overview"]`)
  }
}

export default new Menu()
