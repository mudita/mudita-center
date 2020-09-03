import * as React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { MenuElement } from "Renderer/constants/menu-elements"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import styled from "styled-components"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import RangeIcon from "Renderer/components/core/icon/range-icon.component"
import BatteryIcon from "Renderer/components/core/icon/battery-icon.component"
import { views } from "Renderer/constants/views"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "Common/enums/help-actions.enum"
import { MenuGropTestIds } from "Renderer/components/rest/menu/menu-grop-test-ids.enum"

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2.4rem 0 1.6rem 0;
`

const HeaderIconContainer = styled.div`
  display: flex;
`

const HeaderIconBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  &:hover {
    background-color: ${backgroundColor("minor")};
  }
`

const HeaderIcon = styled(Icon)`
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`

const LinkWrapper = styled.div`
  margin: 0 1rem 0.4rem 1rem;
`

const MenuGroup: FunctionComponent<MenuElement> = ({ label, items, icons }) => {
  const iconConfig = {
    height: 2.4,
    width: 2.4,
  }
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
                    <RangeIcon strength={61} {...iconConfig} />
                  ) : icon === Type.MenuBattery ? (
                    <BatteryIcon level={0.7} {...iconConfig} />
                  ) : (
                    <HeaderIcon type={icon} {...iconConfig} />
                  )}
                </HeaderIconBg>
              ))}
            </HeaderIconContainer>
          )}
        </HeaderWrapper>
      )}
      {items &&
        items.map(({ button, icon }, index) => {
          const buttonMenuConfig = {
            nav: true,
            displayStyle: DisplayStyle.Link4,
            labelMessage: button.label,
            Icon: icon,
            iconSize: { height: 3.2, width: 3.2 },
          }
          if (button === views.help) {
            const openHelpWindow = () =>
              ipcRenderer.callMain(HelpActions.OpenWindow)
            return (
              <LinkWrapper key={index}>
                <Button
                  {...buttonMenuConfig}
                  onClick={openHelpWindow}
                  data-testid={MenuGropTestIds.Help}
                />
              </LinkWrapper>
            )
          }
          return (
            <LinkWrapper key={index}>
              <Button {...buttonMenuConfig} to={button.url} />
            </LinkWrapper>
          )
        })}
    </>
  )
}

export default MenuGroup
