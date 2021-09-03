/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  backgroundColor,
  borderRadius,
  transitionTime,
  transitionTimingFunction,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"
import { TitleOrder } from "Renderer/components/core/modal/modal.interface"
import { getHeaderTemplate } from "Renderer/components/core/modal/modal.helpers"
import Text from "Renderer/components/core/text/text.component"
import Button from "Renderer/components/core/button/button.component"

export const fadeAnimation = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  animation-name: fadeIn;
  animation-duration: ${transitionTime("faster")};
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-timing-function: ${transitionTimingFunction("easeInOut")};
`

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: ${zIndex("modalBackdrop")};

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  ${fadeAnimation};
  animation-duration: ${transitionTime("veryQuick")};
`

export const ModalWrapper = styled.section`
  position: fixed;
  z-index: ${zIndex("modal")};

  display: flex;
  flex-direction: column;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${backgroundColor("row")};
  border-radius: ${borderRadius("medium")};
  box-shadow: 0 0.2rem 3rem 0 rgba(0, 0, 0, 0.08);

  ${fadeAnimation};
`

export const StoryModalWrapper = styled.section`
  z-index: ${zIndex("modal")};

  display: flex;
  flex-direction: column;
  background-color: ${backgroundColor("row")};
  border-radius: ${borderRadius("medium")};
  box-shadow: 0 0.2rem 3rem 0 rgba(0, 0, 0, 0.08);

  ${fadeAnimation};
`

export const Header = styled.div<{
  titleOrder: TitleOrder
  subtitleGap: boolean
}>`
  display: grid;
  grid-template-columns: 1fr 5rem;
  grid-row-gap: ${({ subtitleGap }) => (subtitleGap ? "1rem" : "initial")};
  ${({ titleOrder }) => getHeaderTemplate(titleOrder)};
  box-sizing: border-box;
  padding-bottom: 3.2rem;
`

export const ModalTitle = styled(Text)<{ subTitle?: string }>`
  grid-area: Title;
`

export const ModalSubTitle = styled(Text)`
  grid-area: Subtitle;
`

export const Close = styled(Button)`
  margin-top: -0.6rem;
  margin-right: -0.8rem;
  grid-area: Close;
  justify-self: end;
`

export const CloseButton = styled(Button)<{ actionButton?: boolean }>`
  ${({ actionButton }) =>
    actionButton &&
    css`
      margin-right: 1.5rem;
    `};
`
