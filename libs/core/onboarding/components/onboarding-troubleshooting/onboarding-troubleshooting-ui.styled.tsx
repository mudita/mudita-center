/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import Text from "Core/__deprecated__/renderer/components/core/text/text.component"
import {
  backgroundColor,
  fontWeight,
  textColor,
} from "Core/core/styles/theming/theme-getters"

const stepsContentBaseStyles = css`
  width: 100%;
  max-width: 38rem;
  padding: 2.4rem;
  margin: 0;
  `
const baseContainerStyles = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`

export const Container = styled.section`
  display: grid;
  grid-template-areas: "Content" "ActionsContainer";
  grid-row-gap: 0;
  grid-template-rows: auto 12.4rem;
  width: 100%;
`
export const Content = styled.main`
  ${baseContainerStyles};
  grid-area: Content;`

export const HeaderTitle = styled(Text)`
  margin-top: 1rem;
  margin-bottom: 0.8rem;
`

export const SubheaderTitle = styled(Text)`
  margin-bottom: 3.2rem;
`

export const InstructionTitle = styled(Text)`
  margin-bottom: 2.4rem;
  color: ${textColor("secondary")};
`

export const StepsContent = styled.ol`
  ${stepsContentBaseStyles};
  text-align: left;
  background-color: ${backgroundColor("main")};

  > li {
    margin-left: 1.6rem;

    &:not(:first-of-type) {
      margin-top: 1.6rem;
    }
  }
`

export const MoreInstructionsButton = styled.button<{ openMore?: boolean }>`
  border: none;
  background: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-top: 2.4rem;

  &:focus {
    outline: none;
  }
  span {
    height: 2rem;
    width: 2em;
    margin-left: 0.8rem;

    svg {
      transform: rotate(${({ openMore }) => (openMore ? 0 : 180)}deg);
      path{
        fill: ${textColor("actionHover")};
      }
    }
  }
`

export const MoreStepsContent = styled.ul`
  ${stepsContentBaseStyles};
  list-style-type: "- ";
  text-align: left;

  /* stylelint-disable no-descending-specificity */
  > li {
    margin-left: 1.6rem;

    &:not(:first-of-type) {
      margin-top: 0.8rem;
    }
  }
`

export const ActionsContainer = styled.div`
  ${baseContainerStyles};
  grid-area: ActionsContainer;
`
export const MainActionsContainer = styled.div`
  display: flex;

  button {
    margin: 0 0.6rem;
  }
`

export const SupportButtonContainer = styled.div`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: ${fontWeight("light")};

  button {
    margin-left: 0.2rem;
    padding: 0.4rem;
    width: auto;
    height: auto;
  }
`
