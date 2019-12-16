import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const TabIcon = styled(Svg)`
  height: 1.6rem;
  width: 1.6rem;
  margin-right: 1rem;
`

const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  height: calc(100% - 0.02rem);

  &:not(:last-child) {
    margin-right: 4rem;
  }
`

const TabText = styled(Text)`
  margin: 1.6rem 0 1.3rem 0;
`

interface TabProps {
  icon: FunctionComponent<ImageInterface>
  tabText?: string
}

const Tab: FunctionComponent<TabProps> = ({ icon, tabText }) => {
  return (
    <TabWrapper data-testid="tab">
      <TabIcon Image={icon} />
      <TabText displayStyle={TextDisplayStyle.MediumText}>{tabText}</TabText>
    </TabWrapper>
  )
}

export default Tab
