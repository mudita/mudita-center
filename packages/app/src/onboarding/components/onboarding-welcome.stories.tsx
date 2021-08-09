/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"
import OnboardingWelcome from "App/onboarding/components/onboarding-welcome.component"

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
          onCancel={action("Cancel")}
          onTroubleshooting={action("TroubleshootingInfo")}
        />
      </Wrapper>
    )
  })
