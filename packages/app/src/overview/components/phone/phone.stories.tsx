/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import Phone from "App/overview/components/phone/phone.component"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

storiesOf("Views|Overview/Phone", module).add("Phone", () => {
  return (
    <div style={{ maxWidth: "31.5rem" }}>
      <Part>
        <Phone onDisconnect={action("disconnect phone")} />
      </Part>
    </div>
  )
})
