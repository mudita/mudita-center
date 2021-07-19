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
  font-weight: ${fontWeight("light")};
  margin-bottom: 1.6rem;
  font-weight: ${fontWeight("default")};
`

export const OnboardingWrapper = styled.section`
  display: grid;
  grid-template-areas: "Header" "Main" "Footer";
  grid-row-gap: 0;
  grid-template-rows: 6.5rem 1fr 15.8rem;

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

export const Autostart = styled.div`
  margin-top: 4.8rem;
  margin-bottom: 1.6rem;
  display: flex;
  align-items: center;
  label {
    margin-bottom: 1.2rem;
  }
`

export const AutostartLabel = styled.div`
  margin-left: 1.3rem;
`

export const AutostartSubText = styled(Text)`
  text-align: left;
  margin-top: 0.4rem;
`

export const WelcomeButton = styled(ButtonComponent)`
  margin-top: 3.9rem;
`

export const TroubleshootingButton = styled(ButtonComponent)`
  display: block;
  margin-top: 1.6rem;
  width: fit-content;
`
