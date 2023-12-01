/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC } from "../../models/api-fc.types"

interface IconTextRowData {
  icon: string
  title: string
  text: string
}

export const IconText: APIFC<{}, IconTextRowData> = ({
  data,
  children,
  ...props
}) => {
  const { icon, title, text } = data || {}
  return (
    <IconTextWrapper {...props}>
      <span>{icon}</span>
      <span>{title}</span>
      <span>{text}</span>
    </IconTextWrapper>
  )
}

const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`
