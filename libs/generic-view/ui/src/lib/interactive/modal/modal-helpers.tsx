/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled, { css } from "styled-components"
import Icon from "../../icon/icon"
import { IconType, ModalAction } from "generic-view/utils"
import { iconButtonStyles } from "../../shared/button"
import { ButtonBase } from "../../buttons/button-base/button-base"

export const ModalTitleIcon = styled(Icon)`
  width: 6.8rem;
  height: 6.8rem;
  padding: ${({ theme }) => theme.space.md};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grey5};
`

export const ModalCenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--modal-padding);
  gap: ${({ theme }) => theme.space.xl};

  ${ModalTitleIcon} {
    margin-bottom: -1rem;

    + h1 {
      margin: 0;
      font-size: ${({ theme }) => theme.fontSize.modalTitle};
      line-height: ${({ theme }) => theme.lineHeight.modalTitle};
      font-weight: ${({ theme }) => theme.fontWeight.bold};
      text-align: center;
    }
  }

  & > p,
  article p {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    text-align: center;
    color: ${({ theme }) => theme.color.grey1};
    letter-spacing: 0.02em;
  }
`

export const ModalCloseIcon = styled(Icon).attrs({
  data: { type: IconType.Close },
})`
  cursor: pointer;
  width: 1.6rem;
  height: 1.6rem;
`

export const closeButtonStyles = css`
  position: absolute;
  right: ${({ theme }) => theme.space.xl};
  top: ${({ theme }) => theme.space.xl};
  z-index: 2;
`

const ModalClose = styled(ButtonBase)`
  ${iconButtonStyles};
  ${closeButtonStyles};
`

export const ModalCloseButton: FunctionComponent<{
  action?: ModalAction
}> = ({ action }) => {
  if (!action) return null
  return (
    <ModalClose
      action={action}
      test-id={"close-button"}
      className={"modal-close-button"}
    >
      <ModalCloseIcon />
    </ModalClose>
  )
}

export const ModalButtons = styled.div<{ $vertical?: boolean }>`
  display: grid;

  ${({ $vertical }) =>
    $vertical
      ? css`
          grid-template-columns: 15.6rem;
          grid-auto-flow: row;
          grid-auto-rows: auto;
          row-gap: 1.4rem;
        `
      : css`
          width: 100%;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          column-gap: 2.4rem;
        `}

  button {
    flex: 1;
    min-height: 3.2rem;
  }
`
