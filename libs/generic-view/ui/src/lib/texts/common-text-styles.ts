/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { css } from "styled-components"
import { CommonTextValidators } from "generic-view/models"

export interface CommonTextProps {
  $singleLine?: NonNullable<CommonTextValidators["singleLine"]>
  $textTransform?: NonNullable<CommonTextValidators["textTransform"]>
  $color?: NonNullable<CommonTextValidators["color"]>
  $textAlign?: NonNullable<CommonTextValidators["textAlign"]>
}

export const commonTextStyles = css<CommonTextProps>`
  ${({ $singleLine }) =>
    $singleLine &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}

  text-transform: ${({ $textTransform = "unset" }) =>
    $textTransform === "capitalize-first-letter"
      ? "lowercase"
      : $textTransform};

  ${({ $textTransform }) =>
    $textTransform === "capitalize-first-letter" &&
    css`
      &:first-letter {
        text-transform: uppercase;
      }
    `}

  text-align: ${({ $textAlign = "unset" }) => $textAlign};
`
