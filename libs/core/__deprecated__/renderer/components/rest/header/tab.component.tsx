/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Size,
} from "Core/__deprecated__/renderer/components/core/button/button.config"
import { Message as MessageInterface } from "Core/__deprecated__/renderer/interfaces/message.interface"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"

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
      size={Size.Auto}
      to={url}
      exact
    />
  )
}

export default Tab
