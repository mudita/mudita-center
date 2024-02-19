/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import { backgroundColor, fontWeight, textColor } from "Core/core/styles/theming/theme-getters"

export const OnboardingTroubleshootingWrapper = styled.section`
  display: grid;
  grid-template-areas: "Header" "Main" "Footer";
  grid-row-gap: 0;
  grid-template-rows: 12.7rem 1fr 14rem;

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
  }

  footer {
    grid-area: Footer;
  }
`

export const MoreSteps = styled.ul`
  list-style-type: "- ";
  text-align: left;
  li {
    color: ${textColor("primary")};
    margin-bottom: 0.8rem;
    font-weight: ${fontWeight("light")};
  }
`

export const Steps = styled.ol`
  min-width: 38rem;
  text-align: left;
  background-color: ${backgroundColor("main")};
  padding: 2.4rem;
  margin: 0;
  > li {
    margin-left: 1.6rem;

    &:not(:first-of-type) {
      margin-top: 1.6rem;
    }
  }
`

export const Support = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: ${fontWeight("light")};

  button {
    margin-left: 0.4rem;
    padding: 0.4rem;
    width: auto;
    height: auto;
  }
`

export const TextSorry = styled(Text)`
  margin-bottom: 0.8rem;
`

export const Instruction = styled(Text)`
  margin-bottom: 2.4rem;
  margin-top: 1.6rem;
  color: ${textColor("secondary")};
`

export const AccordionButton = styled.button<{ openMore?: boolean }>`
  border: none;
  background: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-top: 2.9rem;
  margin-bottom: 1.4rem;
  &:focus {
    outline: none;
  }
  span {
    margin-left: 0.8rem;
    svg {
      transform: rotate(${({ openMore }) => (openMore ? 270 : 90)}deg);
    }
  }
`
