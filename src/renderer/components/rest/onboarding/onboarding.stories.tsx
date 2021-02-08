/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { action } from "@storybook/addon-actions"
import OnboardingConnecting from "Renderer/components/rest/onboarding/onboarding-connecting.component"
import styled from "styled-components"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
`

storiesOf("Components/Onboarding", module)
  .add("Welcome", () => {
    return (
      <Wrapper>
        <OnboardingWelcome
          onContinue={action("Continue")}
          onAutostartChange={action("Autostart")}
        />
      </Wrapper>
    )
  })
  .add("Connecting", () => {
    return (
      <Wrapper>
        <OnboardingConnecting onCancel={action("Cancel")} />
      </Wrapper>
    )
  })
  .add("Troubleshooting", () => {
    return (
      <Wrapper>
        <OnboardingTroubleshooting
          onRetry={action("Try again")}
          onContact={action("Contact support")}
        />
      </Wrapper>
    )
  })
