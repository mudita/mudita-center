/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Col,
  RowBackgroundTransitionStyles,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { backgroundColor } from "App/__deprecated__/renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

const ItemCol = styled(Col)`
  cursor: pointer;
  height: 100%;
`

const hoverStyle = css`
  background-color: ${backgroundColor("minor")};
  ${RowBackgroundTransitionStyles}
`

export const AvatarCol = styled(ItemCol)<{ isHovered: boolean }>`
  padding-left: 2rem !important;
  ${({ isHovered }) => (isHovered ? hoverStyle : "")};
`
export const PhoneNumberCol = styled(ItemCol)``

const PhoneNumber = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
`

export const FirstPhoneNumber = styled(PhoneNumber)<{ isHovered: boolean }>`
  :first-of-type {
    padding-left: 2rem;
  }

  ${({ isHovered }) => (isHovered ? hoverStyle : "")};
`

export const SecondPhoneNumber = styled(PhoneNumber)`
  &:hover {
    ${hoverStyle}
  }
`
