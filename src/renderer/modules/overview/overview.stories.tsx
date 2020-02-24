import { storiesOf } from "@storybook/react"
import React from "react"
import OverviewUI from "Renderer/modules/overview/overview-ui.component"
import { noop } from "Renderer/utils/noop"

const fakeState = {
  batteryLevel: 0,
  disconnectDevice: false,
  lastBackup: "10.11.2019",
  osVersion: "3.0",
  memorySpace: {
    free: 0,
    full: 16000000000,
  },
  simCards: [],
  networkName: "Orange",
  osUpdateDate: 1459832991883,
}

storiesOf("Views|Overview", module).add("Overview", () => (
  <div style={{ maxWidth: "63rem" }}>
    <OverviewUI {...fakeState} disconnectDevice={noop} />
  </div>
))
