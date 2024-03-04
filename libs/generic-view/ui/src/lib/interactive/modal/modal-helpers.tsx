/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import styled, { css } from "styled-components"
import Icon from "../../icon/icon"
import { ButtonAction, IconType } from "generic-view/utils"
import { iconButtonStyles } from "../../shared/button"
import { ButtonBase } from "../../buttons/button-base/button-base"

export const ModalTitleIcon = styled(Icon)`
  width: 6.8rem;
  height: 6.8rem;
  padding: ${({ theme }) => theme.space.md};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grey5};
`

export const ModalScrollableContent = styled.div`
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.2rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.grey2};
  }
`

const listBulletStyle = css`
  content: url('data:image/svg+xml,<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle fill="%233B3F42" r="3.5" cx="5" cy="4"/></svg>');
`

export const ModalCenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--modal-padding);
  height: 100%;
  overflow: hidden;
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
    font-size: ${({ theme }) => theme.fontSize.paragraph1};
    line-height: ${({ theme }) => theme.lineHeight.paragraph1};
    text-align: center;
    color: ${({ theme }) => theme.color.grey1};
    letter-spacing: 0.02em;
    margin: 0;
  }

  & > ul,
  article ul {
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

      &::marker {
        ${listBulletStyle};
      }
    }
  }

  *:has(${ModalScrollableContent}) {
    overflow: hidden;
    height: fit-content;
    display: flex;
    flex-direction: column;
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
  action?: ButtonAction
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
