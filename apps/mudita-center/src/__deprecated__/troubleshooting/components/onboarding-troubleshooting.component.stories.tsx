/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"
import OnboardingTroubleshooting from "App/__deprecated__/troubleshooting/components/onboarding-troubleshooting.component"

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
`

storiesOf("Components/Troubleshooting", module).add("Troubleshooting", () => {
  return (
    <Wrapper>
      <OnboardingTroubleshooting
        onRetry={action("Try again")}
        onContact={action("Contact support")}
      />
    </Wrapper>
  )
})
