/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { DeviceType } from "@mudita/pure"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { MenuElement } from "Renderer/constants/menu-elements"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"
import { views } from "Renderer/constants/views"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import {
  HeaderIcon,
  HeaderIconBg,
  HeaderIconContainer,
  HeaderWrapper,
  HiddenIconBg,
  LinkWrapper,
} from "Renderer/components/rest/menu/menu-group.styled"
import { IconType } from "Renderer/components/core/icon/icon-type"

interface MenuGroupProps extends MenuElement {
  deviceType: DeviceType | null
}

const MenuGroup: FunctionComponent<MenuGroupProps> = ({
  label,
  items,
  icons,
  deviceType,
}) => {
  return (
    <>
      {label && (
        <HeaderWrapper data-testid={label.id}>
          <Text displayStyle={TextDisplayStyle.Title} message={label} />
          {icons && (
            <HeaderIconContainer>
              {icons.map((icon: IconType, index) => {
                if (process.env.NODE_ENV === "production") {
                  return <HiddenIconBg key={index} />
                } else {
                  return (
                    <HeaderIconBg key={index}>
                      {icon === IconType.MenuRange ? (
                        <RangeIcon strength={61} size={IconSize.Medium} />
                      ) : icon === IconType.MenuBattery ? (
                        <BatteryIcon level={0.7} size={IconSize.Medium} />
                      ) : (
                        <HeaderIcon type={icon} size={IconSize.Medium} />
                      )}
                    </HeaderIconBg>
                  )
                }
              })}
            </HeaderIconContainer>
          )}
        </HeaderWrapper>
      )}
      {items &&
        items
          .filter(({ hidden }) => !hidden)
          .filter(({ visibleOn }) =>
            visibleOn && deviceType ? visibleOn.includes(deviceType) : true
          )
          .map(({ button, icon, testId }, index) => {
            const buttonMenuConfig = {
              nav: true,
              displayStyle: DisplayStyle.MenuLink,
              labelMessage: button.label,
              Icon: icon,
              iconSize: IconSize.Bigger,
            }
            if (button === views.help) {
              const openHelpWindow = () =>
                ipcRenderer.callMain(HelpActions.OpenWindow)
              return (
                <LinkWrapper key={index}>
                  <Button
                    {...buttonMenuConfig}
                    onClick={openHelpWindow}
                    data-testid={testId}
                  />
                </LinkWrapper>
              )
            }
            return (
              <LinkWrapper key={index}>
                <Button
                  {...buttonMenuConfig}
                  to={button.url}
                  data-testid={testId}
                />
              </LinkWrapper>
            )
          })}
    </>
  )
}

export default MenuGroup
