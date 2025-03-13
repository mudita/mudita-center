/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { icons } from "./icons"
import { IconType } from "app-theme/models"

export const Icon: FunctionComponent<{ name: IconType }> = ({
  name,
  ...props
}) => {
  const IconComponent = icons[name]
  if (!IconComponent) return null
  return <IconComponent {...props} />
}
