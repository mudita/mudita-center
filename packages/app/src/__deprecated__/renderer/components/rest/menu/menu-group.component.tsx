/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { DeviceType } from "App/device/constants"
import Button from "App/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/__deprecated__/renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { MenuElement } from "App/__deprecated__/renderer/constants/menu-elements"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { IconSize } from "App/__deprecated__/renderer/components/core/icon/icon.component"
import RangeIcon from "App/__deprecated__/renderer/components/core/icon/range-icon.component"
import BatteryIcon from "App/__deprecated__/renderer/components/core/icon/battery-icon.component"
import { views } from "App/__deprecated__/renderer/constants/views"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/__deprecated__/common/enums/help-actions.enum"
import {
  HeaderIcon,
  HeaderIconBg,
  HeaderIconContainer,
  HeaderWrapper,
  HiddenIconBg,
  LinkWrapper,
} from "App/__deprecated__/renderer/components/rest/menu/menu-group.styled"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { View } from "App/__deprecated__/renderer/constants/views"
import { NotificationBadge } from "App/notification/components"

interface MenuGroupProps extends MenuElement {
  deviceType: DeviceType | null
  notifications: {
    [View.Messages]: boolean
  }
}

const MenuGroup: FunctionComponent<MenuGroupProps> = ({
  label,
  items,
  icons,
  deviceType,
  notifications,
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
          .map(({ button, icon, testId, viewKey }, index) => {
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
                <NotificationBadge
                  active={Boolean(
                    viewKey &&
                      viewKey === View.Messages &&
                      notifications[viewKey]
                  )}
                >
                  <Button
                    {...buttonMenuConfig}
                    to={button.url}
                    data-testid={testId}
                  />
                </NotificationBadge>
              </LinkWrapper>
            )
          })}
    </>
  )
}

export default MenuGroup
