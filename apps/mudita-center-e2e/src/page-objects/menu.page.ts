/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

export class Menu extends Page {
  public get newsLink() {
    return $("//a[@href='#/news']")
  }

  public get kompaktLabel() {
    return $("//*[@data-testid='Kompakt']")
  }

  public get overviewLink() {
    return $("//a[@href='#/generic/mc-overview']")
  }

  public get muditaCenterLabel() {
    return $("//*[@data-testid='component.menuHeaderDesktopApp']")
  }

  public get settingsLink() {
    return $("//a[@href='#/settings']")
  }

  public get helpLink() {
    return $("//a[@href='#/help']")
  }
}

export default new Menu()
