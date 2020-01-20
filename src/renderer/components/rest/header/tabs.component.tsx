import * as React from "react"
import Tab from "Renderer/components/rest/header/tab.component"
import { TAB_ELEMENTS } from "Renderer/constants/tab-elements"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const TabsWrapper = styled.div`
  display: flex;
`

interface Props {
  currentLocation?: string
}

const Tabs: FunctionComponent<Props> = ({ className, currentLocation }) => {
  const data = TAB_ELEMENTS.filter(
    ({ parentUrl, tabs }) => parentUrl === currentLocation && tabs
  )[0]

  const tabsList = data?.tabs.map(tab => (
    <Tab tabText={tab.label} icon={tab.icon} key={tab.label.id} />
  ))

  return <TabsWrapper className={className}>{tabsList}</TabsWrapper>
}

export default Tabs
