/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
} from "react"
import styled, { css } from "styled-components"
import { InputWrapper } from "../form/checkbox/checkbox"

interface Props extends PropsWithChildren {
  active?: boolean
  onClick?: MouseEventHandler
}
export const ListItem: FunctionComponent<Props> = ({
  children,
  active,
  ...props
}) => {
  return (
    <ListItemWrapper $active={active} {...props}>
      {children}
    </ListItemWrapper>
  )
}

export const listRawItemStyles = css`
  &,
  td {
    border-bottom: solid 0.1rem ${({ theme }) => theme.app.color.grey5};
  }
`

export const listItemBaseStyles = css`
  position: relative;
  transition:
    background 0.15s ease-in-out,
    border 0.15s ease-in-out;

  &,
  td {
    border-bottom: solid 0.1rem ${({ theme }) => theme.app.color.grey5};
  }

  &:hover {
    background: ${({ theme }) => theme.app.color.grey6};

    &,
    td {
      border-bottom-color: ${({ theme }) => theme.app.color.grey4};
    }
  }
`

export const listItemActiveStyles = css`
  background: ${({ theme }) => theme.app.color.grey5};

  &:before {
    background: ${({ theme }) => theme.app.color.grey1};
  }

  &:hover {
    background: ${({ theme }) => theme.app.color.grey8};
    &,
    td {
      border-bottom-color: ${({ theme }) => theme.app.color.grey4};
    }
  }
`

export const listItemSelectedStyles = css`
  &:has(${InputWrapper} input:checked) {
    background: ${({ theme }) => theme.app.color.grey5};

    &:hover {
      background: ${({ theme }) => theme.app.color.grey8};
      &,
      td {
        border-bottom-color: ${({ theme }) => theme.app.color.grey4};
      }
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

  &:has(${InputWrapper} input:checked) {
    background: ${({ theme }) => theme.app.color.grey5};

    &:hover {
      background: ${({ theme }) => theme.app.color.grey8};
      &,
      td {
        border-bottom-color: ${({ theme }) => theme.app.color.grey4};
      }
    }
  }
`

const ListItemWrapper = styled.div<{ $active?: boolean }>`
  ${listItemBaseStyles};
  ${listItemClickableStyles};
  ${({ $active = false }) => $active && listItemActiveStyles}
`
