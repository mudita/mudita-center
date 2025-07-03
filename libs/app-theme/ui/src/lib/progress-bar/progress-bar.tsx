/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ProgressBarTestIds } from "app-theme/models"
import { ComponentProps, FunctionComponent, useId } from "react"
import styled from "styled-components"

interface Props extends ComponentProps<typeof Wrapper> {
  value: number
  maxValue?: number
  valueUnit?: string
  message?: string
}

export const ProgressBar: FunctionComponent<Props> = ({
  value,
  maxValue = 100,
  valueUnit = "%",
  message,
  ...rest
}) => {
  const id = useId()
  return (
    <Wrapper {...rest}>
      {message !== undefined && (
        <Message data-testid={ProgressBarTestIds.Description}>
          {message}
        </Message>
      )}
      <Progress
        id={"progress-" + id}
        max={maxValue}
        value={value}
        data-testid={ProgressBarTestIds.Progress}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuetext={`${value} ${valueUnit}`}
      />
      <Label
        htmlFor={"progress-" + id}
        data-testid={ProgressBarTestIds.Details}
      >
        {value}
        {valueUnit || "%"}
      </Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.app.space.sm};
`

const Message = styled.span`
  font-size: ${({ theme }) => theme.app.fontSize.paragraph4};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph4};
  color: ${({ theme }) => theme.app.color.grey2};
  font-weight: ${({ theme }) => theme.app.fontWeight.light};
  letter-spacing: 0.05em;
  margin: 0 0 0.6rem 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
  text-align: center;
  min-height: ${({ theme }) => theme.app.lineHeight.paragraph4};
`

const Progress = styled.progress`
  width: 100%;
  max-width: 22.3rem;
  height: 0.4rem;
  border-radius: 0.2rem;
  overflow: hidden;

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.app.color.grey5};
  }

  &::-webkit-progress-value {
    background-color: ${({ theme }) => theme.app.color.grey1};
    border-radius: 0.2rem;
    transition: width 0.15s linear;
  }
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
  color: ${({ theme }) => theme.app.color.black};
  letter-spacing: 0.05em;
`
