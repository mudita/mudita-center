/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import ButtonComponent from "Renderer/components/core/button/button.component"

export const Title = styled(Text)`
  font-size: 3rem;
  margin-bottom: 1.6rem;
  font-weight: ${fontWeight("default")};
`

export const OnboardingWrapper = styled.section`
  display: grid;
  grid-template-areas: "Header" "Main" "Footer";
  grid-row-gap: 0;
  grid-template-rows: 6.5rem 1fr 14rem;

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
export const InstructionText = styled(Text)`
  font-weight: ${fontWeight("default")};
`

export const WelcomeButton = styled(ButtonComponent)`
  margin-top: 3.6rem;
`

export const TroubleshootingButton = styled(ButtonComponent)`
  display: block;
  margin-top: 1.2rem;
  width: fit-content;
`
