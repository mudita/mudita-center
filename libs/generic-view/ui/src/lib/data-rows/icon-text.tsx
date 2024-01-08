/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled from "styled-components"
import { APIFC, withData } from "generic-view/utils"

interface IconTextRowData {
  icon: string
  title: string
  text: string
}

export const IconText: APIFC<IconTextRowData> = ({ data, ...props }) => {
  const { icon, title, text } = data || {}
  return (
    <IconTextWrapper {...props}>
      <span>{icon}</span>
      <span>{title}</span>
      <span>{text}</span>
    </IconTextWrapper>
  )
}

export default withData(IconText)

const IconTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 0;
`
