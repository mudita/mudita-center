/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "generic-view/utils"
import { Tag } from "../shared/tag"
import { withData } from "../utils/with-data"

interface Data {
  text: string
  variant?: "dark" | "light"
}

export const Badge: APIFC<Data> = ({ data, config, ...props }) => {
  if (!data) return null
  return (
    <BadgeWrapper {...props} variant={data?.variant || "light"}>
      {data.text}
    </BadgeWrapper>
  )
}

export default withData(Badge)

const BadgeWrapper = styled(Tag)<{ variant: Data["variant"] }>`
  height: 2.2rem;
  line-height: 2.2rem;

  ${({ variant, theme }) =>
    variant === "dark" &&
    css`
      background-color: ${theme.color.grey4};
      color: ${theme.color.black};
    `}
`
