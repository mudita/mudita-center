/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useId } from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { ProgressBarConfig, ProgressBarData } from "generic-view/models"

export const ProgressBar: APIFC<ProgressBarData, ProgressBarConfig> = ({
  data,
  config,
  ...props
}) => {
  const id = useId()
  return (
    <Wrapper {...props}>
      {data?.message && <Message>{data?.message}</Message>}
      <Progress
        id={"progress-" + id}
        max={config.maxValue}
        value={data?.value}
      />
      <Label htmlFor={"progress-" + id}>
        {data?.value}
        {config.valueUnit || "%"}
      </Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.generic.space.sm};
`

const Message = styled.span`
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph4};
  color: ${({ theme }) => theme.generic.color.grey2};
  font-weight: ${({ theme }) => theme.generic.fontWeight.light};
  letter-spacing: 0.05em;
  margin: 0 0 0.6rem 0;
`

const Progress = styled.progress`
  width: 100%;
  height: 0.4rem;
  border-radius: 0.2rem;
  overflow: hidden;

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.generic.color.grey5};
  }

  &::-webkit-progress-value {
    background-color: ${({ theme }) => theme.generic.color.grey1};
    border-radius: 0.2rem;
    transition: width 0.15s linear;
  }
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.generic.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.generic.lineHeight.paragraph3};
  color: ${({ theme }) => theme.generic.color.black};
  letter-spacing: 0.05em;
`
