/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import { DeviceType } from "@mudita/pure"
import { DevicePreview } from "App/overview/components/device-preview/device-preview.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

storiesOf("Views|Overview/Device", module)
  .add("Device Preview: Mudita Pure", () => {
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
  })
  .add("Device Preview: Mudita Harmony", () => {
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
  })
