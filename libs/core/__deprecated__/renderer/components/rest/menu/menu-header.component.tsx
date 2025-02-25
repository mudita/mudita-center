/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { DeviceType } from "device-protocol/models"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  HeaderIconBg,
  HeaderIconContainer,
  HeaderWrapper,
} from "Core/__deprecated__/renderer/components/rest/menu/menu-group.styled"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import MenuIcon from "Core/__deprecated__/renderer/components/rest/menu/menu-icon.component"

const MenuHeader: FunctionComponent<{
  label: string | { id: string }
  icons?: IconType[]
  deviceType: DeviceType | null
}> = ({ label, icons, deviceType }) => {
  return (
    <HeaderWrapper data-testid={typeof label === "string" ? label : label.id}>
      <Text displayStyle={TextDisplayStyle.Title} message={label} />
      {icons && (
        <HeaderIconContainer>
          {icons.map((icon, index) => (
            <HeaderIconBg key={index}>
              <MenuIcon icon={icon} deviceType={deviceType} />
            </HeaderIconBg>
          ))}
        </HeaderIconContainer>
      )}
    </HeaderWrapper>
  )
}

export default MenuHeader
