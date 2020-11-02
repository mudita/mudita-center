import * as React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { MenuElement } from "Renderer/constants/menu-elements"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { IconSize } from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
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
  HelpButton,
  LinkWrapper,
} from "Renderer/components/rest/menu/menu-group.styled"

const MenuGroup: FunctionComponent<MenuElement> = ({ label, items, icons }) => {
  return (
    <>
      {label && (
        <HeaderWrapper data-testid={label.id}>
          <Text displayStyle={TextDisplayStyle.SmallText} message={label} />
          {icons && (
            <HeaderIconContainer>
              {icons.map((icon: Type, index) => (
                <HeaderIconBg key={index}>
                  {icon === Type.MenuRange ? (
                    <RangeIcon strength={61} size={IconSize.Medium} />
                  ) : icon === Type.MenuBattery ? (
                    <BatteryIcon level={0.7} size={IconSize.Medium} />
                  ) : (
                    <HeaderIcon type={icon} size={IconSize.Medium} />
                  )}
                </HeaderIconBg>
              ))}
            </HeaderIconContainer>
          )}
        </HeaderWrapper>
      )}
      {items &&
        items
          .filter(({ hideOnProd }) => !hideOnProd)
          .map(({ button, icon, testId }, index) => {
            const buttonMenuConfig = {
              nav: true,
              displayStyle: DisplayStyle.Link4,
              labelMessage: button.label,
              Icon: icon,
              iconSize: IconSize.Bigger,
            }
            if (button === views.help) {
              const openHelpWindow = () =>
                ipcRenderer.callMain(HelpActions.OpenWindow)
              return (
                <LinkWrapper key={index}>
                  <HelpButton
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
