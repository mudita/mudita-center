/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, ReactNode } from "react"
import styled from "styled-components"
import { Typography } from "app-theme/ui"

interface Props {
  label: string
  value?: ReactNode
}

export const DetailsSingleRow: FunctionComponent<Props> = ({
  label,
  value,
}) => {
  if (!value) {
    return null
  }
  return (
    <Wrapper>
      <Typography.H5>{label}</Typography.H5>
      <Typography.P4 color={"black"} lines={1}>
        {value}
      </Typography.P4>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`
