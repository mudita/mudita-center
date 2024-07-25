/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { HelpService } from "./help.service"

export const registerHelpService = () => {
  const helpService = new HelpService()
  void helpService.initialize()
}
