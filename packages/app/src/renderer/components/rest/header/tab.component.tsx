/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { IconSize } from "App/renderer/components/core/icon/icon.component"
import { IconType } from "Renderer/components/core/icon/icon-type"

interface TabProps {
  icon: IconType
  label?: MessageInterface
  url?: string
}

const Tab: FunctionComponent<TabProps> = ({ icon, label, url, className }) => {
  return (
    <Button
      className={className}
      nav
      displayStyle={DisplayStyle.Tab}
      labelMessage={label}
      iconSize={IconSize.Medium}
      Icon={icon}
      to={url}
      exact
    />
  )
}

export default Tab
