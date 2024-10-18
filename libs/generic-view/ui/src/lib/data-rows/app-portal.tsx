/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIFC } from "generic-view/utils"
import { AppPortalConfig } from "generic-view/models"
import { createPortal } from "react-dom"

export const AppPortal: APIFC<undefined, AppPortalConfig> = ({ children, config }) => {
  const appHeaderElement = document.querySelector(`#${config.portal}`)
  if (!appHeaderElement || !children) return null
  return createPortal(children, appHeaderElement)
}
