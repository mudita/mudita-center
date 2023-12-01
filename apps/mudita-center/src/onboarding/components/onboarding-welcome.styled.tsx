/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { fontWeight } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import ButtonComponent from "App/__deprecated__/renderer/components/core/button/button.component"

export const OnboardingWrapper = styled.section`
  display: grid;
  grid-template-areas: "Header" "Main" "Footer";
  grid-row-gap: 0;
  grid-template-rows: 5.7rem 1fr auto;

  header,
  main,
  footer {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header {
    grid-area: Header;

    p {
      font-weight: ${fontWeight("light")};
    }
  }

  main {
    grid-area: Main;
    justify-content: center;
  }

  footer {
    grid-area: Footer;
  }
`

export const WelcomeButton = styled(ButtonComponent)`
  margin-top: 1.6rem;
`

export const TroubleshootingButton = styled(ButtonComponent)`
  display: block;
  margin-top: 0.9rem;
  width: fit-content;
`
