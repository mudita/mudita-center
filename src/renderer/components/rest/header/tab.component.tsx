import * as React from "react"
import Svg from "Renderer/components/core/svg/svg.component"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Image as ImageInterface } from "Renderer/interfaces/image.interface"
import { Message as MessageInterface } from "Renderer/interfaces/message.interface"
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
  margin: 2.6rem 0 1.5rem 0;

  &:not(:last-child) {
    margin-right: 4rem;
  }
`

interface TabProps {
  icon: FunctionComponent<ImageInterface>
  tabText?: MessageInterface
}

const Tab: FunctionComponent<TabProps> = ({ icon, tabText }) => {
  return (
    <TabWrapper data-testid="tab">
      <TabIcon Image={icon} />
      <Text displayStyle={TextDisplayStyle.MediumText} message={tabText} />
    </TabWrapper>
  )
}

export default Tab
