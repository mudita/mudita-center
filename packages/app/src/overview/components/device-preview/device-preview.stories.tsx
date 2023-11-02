import React from "react"
import { DeviceType } from "App/device/constants"
import { DevicePreview } from "App/overview/components/device-preview/device-preview.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

export default {
  title: "Views|Overview/Device",
}

export const DevicePreviewMuditaPure = () => {
  return (
    <div style={{ maxWidth: "31.5rem" }}>
      <Part>
        <DevicePreview
          deviceType={DeviceType.MuditaPure}
          onDisconnect={action("disconnect phone")}
        />
      </Part>
    </div>
  )
}

DevicePreviewMuditaPure.story = {
  name: "Device Preview: Mudita Pure",
}

export const DevicePreviewMuditaHarmony = () => {
  return (
    <div style={{ maxWidth: "31.5rem" }}>
      <Part>
        <DevicePreview
          deviceType={DeviceType.MuditaHarmony}
          onDisconnect={action("disconnect phone")}
        />
      </Part>
    </div>
  )
}

DevicePreviewMuditaHarmony.story = {
  name: "Device Preview: Mudita Harmony",
}
