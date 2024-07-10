/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { storiesOf } from "@storybook/react"
import { DeviceType } from "device-protocol/models"
import { DevicePreview } from "Core/overview/components/device-preview/device-preview.component"

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
          <DevicePreview deviceType={DeviceType.MuditaPure} />
        </Part>
      </div>
    )
  })
  .add("Device Preview: Mudita Harmony", () => {
    return (
      <div style={{ maxWidth: "31.5rem" }}>
        <Part>
          <DevicePreview deviceType={DeviceType.MuditaHarmony} />
        </Part>
      </div>
    )
  })
