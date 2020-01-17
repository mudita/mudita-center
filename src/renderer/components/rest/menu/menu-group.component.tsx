import * as React from "react"
import Button from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { MenuElement } from "Renderer/constants/menuElements"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2.5rem 0 1.6rem 0;
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
    background-color: ${backgroundColor("grey2")};
  }
`

const HeaderIcon = styled(Svg)`
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`

const LinkWrapper = styled.div`
  margin: 0 1rem;
`

const ButtonMenu = styled(Button)`
  margin: 0 0 0.8rem 0;
`

const MenuGroup: FunctionComponent<MenuElement> = ({ label, items, icons }) => {
  return (
    <>
      {label && (
        <HeaderWrapper>
          <Text displayStyle={TextDisplayStyle.SmallText} message={label} />
          {icons && (
            <HeaderIconContainer>
              {icons.map((icon: FunctionComponent<ImageInterface>, index) => (
                <HeaderIconBg key={index}>
                  <HeaderIcon Image={icon} />
                </HeaderIconBg>
              ))}
            </HeaderIconContainer>
          )}
        </HeaderWrapper>
      )}

      {items &&
        items!.map(({ button, icon }, index) => (
          <LinkWrapper key={index}>
            <ButtonMenu
              nav
              displayStyle={DisplayStyle.Link4}
              labelMessage={button.label}
              Icon={icon}
              to={button.url}
            />
          </LinkWrapper>
        ))}
    </>
  )
}

export default MenuGroup
