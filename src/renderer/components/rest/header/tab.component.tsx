import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { borderColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const TabIcon = styled(Svg)`
  height: 1.6rem;
  width: 1.6rem;
  margin-right: 1rem;
`

const TabWrapper = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  height: calc(100% - 0.02rem);

  &:not(:last-child) {
    margin-right: 4rem;
  }
  ${({ active }) =>
    active &&
    css`
      border-bottom: 0.02rem solid ${borderColor("active")};
    `}
`

interface TabProps {
  icon: FunctionComponent<ImageInterface>
  tabText?: string
  active?: boolean
  onClick?: () => void
}

const Tab: FunctionComponent<TabProps> = ({
  icon,
  tabText,
  active,
  onClick,
}) => {
  return (
    <TabWrapper onClick={onClick} active={Boolean(active)} data-testid="tab">
      <TabIcon Image={icon} />
      <Text displayStyle={TextDisplayStyle.MediumText}>{tabText}</Text>
    </TabWrapper>
  )
}

export default Tab
