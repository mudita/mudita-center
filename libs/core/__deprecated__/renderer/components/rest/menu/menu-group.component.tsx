/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { DeviceType } from "device-protocol/models"
import Button from "Core/__deprecated__/renderer/components/core/button/button.component"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { MenuElement } from "Core/__deprecated__/renderer/constants/menu-elements"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { IconSize } from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import RangeIcon from "Core/__deprecated__/renderer/components/core/icon/range-icon.component"
import BatteryIcon from "Core/__deprecated__/renderer/components/core/icon/battery-icon.component"
import { View } from "Core/__deprecated__/renderer/constants/views"
import {
  HeaderIcon,
  HeaderIconBg,
  HeaderIconContainer,
  HeaderWrapper,
  HiddenIconBg,
  LinkWrapper,
} from "Core/__deprecated__/renderer/components/rest/menu/menu-group.styled"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { NotificationBadge } from "Core/notification/components"

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
        <HeaderWrapper
          data-testid={typeof label === "string" ? label : label.id}
        >
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
                        <BatteryIcon
                          level={0.7}
                          size={IconSize.Medium}
                          deviceType={deviceType}
                        />
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
          .map(
            (
              { button, icon, testId, disableWhenActive = true, viewKey },
              index
            ) => {
              const buttonMenuConfig = {
                nav: true,
                displayStyle: DisplayStyle.MenuLink,
                Icon: icon,
                iconSize: IconSize.Large,
                ...(typeof button.label === "string"
                  ? { label: button.label }
                  : { labelMessage: button.label }),
                disableWhenActive,
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
            }
          )}
    </>
  )
}

export default MenuGroup
