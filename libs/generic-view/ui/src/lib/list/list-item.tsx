/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "generic-view/utils"
import { ListItemConfig } from "generic-view/models"
import { CheckboxInputWrapper } from "../interactive/form/input/checkbox-input"
import { useButtonAction } from "../buttons/button-base/use-button-action"

export const ListItem: APIFC<undefined, ListItemConfig> = ({
  config,
  data,
  children,
  ...props
}) => {
  const actions = config?.actions ?? []
  const callButtonAction = useButtonAction(props.viewKey as string)
  const callAction = () => callButtonAction(actions)
  return (
    <ListItemWrapper $active={config?.active} onClick={callAction} {...props}>
      {children}
    </ListItemWrapper>
  )
}

export const listRawItemStyles = css`
  border-bottom: solid 0.1rem ${({ theme }) => theme.color.grey5};
`

export const listItemBaseStyles = css`
  position: relative;
  border-bottom: solid 0.1rem ${({ theme }) => theme.color.grey5};
  transition: background 0.15s ease-in-out, border 0.15s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.color.grey6};
    border-bottom-color: ${({ theme }) => theme.color.grey4};
  }
`

export const listItemActiveStyles = css`
  background: ${({ theme }) => theme.color.grey5};

  &:before {
    background: ${({ theme }) => theme.color.grey1};
  }

  &:hover {
    background: ${({ theme }) => theme.color.grey8};
    border-bottom-color: ${({ theme }) => theme.color.grey4};
  }
`

export const listItemSelectedStyles = css`
  &:has(${CheckboxInputWrapper} input:checked) {
    background: ${({ theme }) => theme.color.grey5};

    &:hover {
      background: ${({ theme }) => theme.color.grey8};
      border-bottom-color: ${({ theme }) => theme.color.grey4};
    }
  }
`

export const listItemClickableStyles = css`
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 100%;
    background: transparent;
    z-index: 1;
    transition: background 0.15s ease-in-out;
  }

  &:has(${CheckboxInputWrapper} input:checked) {
    background: ${({ theme }) => theme.color.grey5};

    &:hover {
      background: ${({ theme }) => theme.color.grey8};
      border-bottom-color: ${({ theme }) => theme.color.grey4};
    }
  }
`

const ListItemWrapper = styled.div<{ $active?: boolean }>`
  ${listItemBaseStyles};
  ${listItemClickableStyles};
  ${({ $active = false }) => $active && listItemActiveStyles}
`
