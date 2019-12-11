import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

const TabIcon = styled(Svg)`
  margin-right: 1rem;
`

const TabWrapper = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid red;
  &:not(:last-child) {
    margin-right: 4rem;
  }
  ${({ active }) =>
    active &&
    css`
      background-color: hotpink;
    `}
`

const TabText = styled(Text)``

interface TabProps {
  icon: FunctionComponent<ImageInterface>
  tabText?: string
  active: boolean
  onClick: () => void
}

const Tab: FunctionComponent<TabProps> = ({
  icon,
  tabText,
  active,
  onClick,
}) => {
  return (
    <TabWrapper onClick={onClick} active={active}>
      <TabIcon Image={icon} />
      <TabText displayStyle={TextDisplayStyle.MediumText}>{tabText}</TabText>
    </TabWrapper>
  )
}

export default Tab
