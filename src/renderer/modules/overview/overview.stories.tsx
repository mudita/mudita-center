import { storiesOf } from "@storybook/react"
import React from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"

const fakeState = {
  batteryLevel: 0,
  lastBackup: "10.11.2019",
  osVersion: "3.0",
  memorySpace: {
    free: 0,
    full: 16000000000,
  },
  simCards: [],
}

storiesOf("Views|Overview", module).add("Overview", () => (
  <div style={{ maxWidth: "63rem" }}>
    <OverviewUI {...fakeState} networkName={"Orange"} />
  </div>
))
