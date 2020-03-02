/**
 * Please do not review.
 * This component is going to be merged with https://github.com/Appnroll/pure-desktop-app/pull/75
 */
import React from "react"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"
import FunctionComponent from "Renderer/types/function-component.interface"
import useSystemUpdateFlow from "Renderer/modules/overview/system-update.hook"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"

const Overview: FunctionComponent<BasicInfoInitialState> = props => {
  // Mocked data, only for testing purposes.
  // TODO: Remove after merge with https://appnroll.atlassian.net/browse/PDA-70
  const lastUpdate = "2020-02-18T13:54:32.943Z"
  const onUpdateCheck = useSystemUpdateFlow(lastUpdate)

  return (
    <OverviewUI
      onUpdateCheck={onUpdateCheck}
      lastUpdate={lastUpdate}
      {...props}
    />
  )
}

export default Overview
