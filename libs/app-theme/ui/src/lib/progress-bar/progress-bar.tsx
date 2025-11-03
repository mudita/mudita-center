/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ProgressBarTestIds } from "app-theme/models"
import { ComponentProps, FunctionComponent, useId } from "react"
import styled, { css, keyframes } from "styled-components"
import { clamp } from "lodash"
import { AnimatePresence, motion } from "motion/react"

interface Props extends ComponentProps<typeof Wrapper> {
  value: number
  maxValue?: number
  valueUnit?: string
  message?: string
  indeterminate?: boolean
}

export const ProgressBar: FunctionComponent<Props> = ({
  value,
  maxValue = 100,
  valueUnit = "%",
  message,
  indeterminate,
  ...rest
}) => {
  const id = useId()
  const clampedValue = clamp(value, 0, maxValue)
  const percentage = (clampedValue / maxValue) * 100
  return (
    <Wrapper {...rest}>
      <AnimatePresence initial={true} mode="wait">
        {message !== undefined && (
          <Message
            key={message}
            data-testid={ProgressBarTestIds.Description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {message}
          </Message>
        )}
      </AnimatePresence>
      <Progress
        id={"progress-" + id}
        max={maxValue}
        value={clampedValue}
        $indeterminate={indeterminate}
        $percentage={percentage}
        data-testid={ProgressBarTestIds.Progress}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuetext={`${clampedValue} ${valueUnit}`}
      />
      <Label
        htmlFor={"progress-" + id}
        data-testid={ProgressBarTestIds.Details}
      >
        <span>{clampedValue}</span>
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

const Message = styled(motion.span)`
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

const indeterminateAnimation = keyframes`
  0% {
    --bar-offset: -90%;
  }
  100% {
    --bar-offset: 390%;
  }
`

const Progress = styled.progress<{
  $indeterminate?: boolean
  $percentage?: number
}>`
  width: 100%;
  max-width: 22.3rem;
  height: 0.4rem;
  border-radius: 0.2rem;
  overflow: hidden;
  position: relative;

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.app.color.grey5};
  }

  &::-webkit-progress-value {
    background-color: ${({ theme }) => theme.app.color.grey1};
    border-radius: 0.2rem;
  }

  ${({ $indeterminate }) =>
    $indeterminate
      ? css`
          animation: ${indeterminateAnimation} 1.5s ease-in-out infinite
            alternate;
          &::-webkit-progress-value {
            width: 25% !important;
            transform: translateX(var(--bar-offset)) !important;
            transition:
              width 0.15s linear,
              transform 1.5s linear;
          }
        `
      : css`
          &::-webkit-progress-value {
            transition:
              width 0.3s ease-out,
              transform 0.3s ease-out;
          }
        `};
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.app.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.app.lineHeight.paragraph3};
  color: ${({ theme }) => theme.app.color.black};
  letter-spacing: 0.05em;

  span {
    display: inline-block;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: 0;
    margin-right: 0.05em;
    font-variant-numeric: tabular-nums;
  }
`
