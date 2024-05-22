/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* stylelint-disable no-duplicate-selectors */

import styled, { css } from "styled-components"
import {
  ModalSizeControllerLarge,
  ModalSizeControllerMedium,
  ModalSizeControllerSmall,
} from "./modal-size-controller"
import { TitleIcon } from "./modal-title-icon"
import { ScrollableContent } from "./modal-scrollable-content"
import { ModalVisibilityControllerHidden } from "./modal-visibility-controller"

export type ModalSize = "small" | "medium" | "large"

export const getModalSize = (size: ModalSize) => {
  switch (size) {
    case "small":
      return "38.4rem"
    case "medium":
      return "48.8rem"
    case "large":
      return "61.4rem"
  }
}

const listBulletStyle = css`
  &::marker {
    content: url('data:image/svg+xml,<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle fill="%233B3F42" r="3.5" cx="5" cy="4"/></svg>');
  }
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--modal-padding);
  height: 100%;
  opacity: var(--modal-opacity);
  visibility: var(--modal-visibility);
  transition-duration: var(--modal-transition-duration);
  transition-timing-function: var(--modal-transition-timing-function);
  transition-property: opacity, visibility;

  overflow: hidden;
  gap: var(--modal-gap);

  &:has(${ModalSizeControllerSmall}) {
    --modal-width: ${getModalSize("small")};
  }
  &:has(${ModalSizeControllerMedium}) {
    --modal-width: ${getModalSize("medium")};
  }
  &:has(${ModalSizeControllerLarge}) {
    --modal-width: ${getModalSize("large")};
  }

  &:has(${ModalVisibilityControllerHidden}) {
    --modal-opacity: 0;
    --modal-visibility: hidden;
  }

  width: var(--modal-width);

  ${TitleIcon} {
    margin-bottom: -1rem;
  }

  p {
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    text-align: center;
    color: ${({ theme }) => theme.color.grey1};
    letter-spacing: 0.02em;
    margin: 0;
    white-space: pre-line;
  }

  ul {
    width: 100%;
    margin: 0;
    padding-left: 2.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    li {
      padding: 0.4rem 1.2rem 0.4rem 2.1rem;
      font-size: ${({ theme }) => theme.fontSize.paragraph1};
      line-height: ${({ theme }) => theme.lineHeight.paragraph1};
      letter-spacing: 0.02em;
      color: ${({ theme }) => theme.color.grey1};
      text-align: left;
      ${listBulletStyle};
    }
  }

  *:has(${ScrollableContent}) {
    overflow: hidden;
    height: fit-content;
    display: flex;
    flex-direction: column;
  }
`
