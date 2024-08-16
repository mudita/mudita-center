/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Page from "./page"

class NewHelpPage extends Page {
  public get helpHeader() {
    return $('[data-testid="location"]')
  }
  // public get welcomeText() {
  //     return $('[data-testid="welcome-text"]')
  // }
  // public get welcomeParagraph()
  // public get searchBar()
  // public get WhichDevice()
  // public get categoryTabs()
  // public get helpRequestText()
  // public get WeDoOurBest()
  //TODO To fix button-text_undefined
  public get ContactSupportButton() {
    return $('[data-testid="button-text_undefined"]')
  }
  public get iconContactSupport() {
    return $('[data-testid="icon-support"]')
  }
}

export default new NewHelpPage()
