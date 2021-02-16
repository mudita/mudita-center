/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import styled from "styled-components"
import Text from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"

export const Title = styled(Text)`
  font-size: 3rem;
  font-weight: ${fontWeight("light")};
  margin-bottom: 3.2rem;

  strong {
    font-weight: ${fontWeight("default")};
  }
`

export const OnboardingWrapper = styled.section`
  display: grid;
  grid-template-areas: "Header" "Main" "Footer";
  grid-row-gap: 2.4rem;
  grid-template-rows: 8rem 1fr 11rem;

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
