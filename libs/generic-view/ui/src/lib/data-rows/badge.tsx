/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "generic-view/utils"
import { Tag } from "../shared/tag"
import { BadgeData } from "generic-view/models"

export const Badge: APIFC<BadgeData> = ({ data, config, ...props }) => {
  if (!data) return null
  return (
    <BadgeWrapper {...props} variant={data?.variant || "light"}>
      {data.text}
    </BadgeWrapper>
  )
}

const BadgeWrapper = styled(Tag)<{ variant: BadgeData["variant"] }>`
  height: 2.2rem;
  line-height: 2.2rem;

  ${({ variant, theme }) =>
    variant === "dark" &&
    css`
      background-color: ${theme.color.grey4};
      color: ${theme.color.black};
    `}
`
