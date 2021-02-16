/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  backgroundColor,
  borderRadius,
  transitionTime,
  transitionTimingFunction,
  zIndex,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

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
