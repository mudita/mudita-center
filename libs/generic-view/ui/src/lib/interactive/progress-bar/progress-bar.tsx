/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useId } from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"

interface Data {
  value: number
  message?: string
}

interface Config {
  maxValue: number
  valueUnit?: string
}

export const ProgressBar: APIFC<Data, Config> = ({
  data,
  config,
  ...props
}) => {
  const id = useId()
  return (
    <Wrapper {...props}>
      {data?.message && <Message>{data.message}</Message>}
      <Progress
        id={"progress-" + id}
        max={config?.maxValue}
        value={data?.value}
      />
      <Label htmlFor={"progress-" + id}>
        {data?.value}
        {config?.valueUnit || "%"}
      </Label>
    </Wrapper>
  )
}

export default ProgressBar

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

const Message = styled.span`
  font-size: ${({ theme }) => theme.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.lineHeight.paragraph4};
  color: ${({ theme }) => theme.color.grey2};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  letter-spacing: 0.05em;
  margin: 0 0 0.6rem 0;
`

const Progress = styled.progress`
  width: 100%;
  height: 0.4rem;
  border-radius: 0.2rem;
  overflow: hidden;

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.color.grey5};
  }

  &::-webkit-progress-value {
    background-color: ${({ theme }) => theme.color.grey1};
    border-radius: 0.2rem;
    transition: width 0.15s linear;
  }
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  color: ${({ theme }) => theme.color.black};
  letter-spacing: 0.05em;
`
