/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ProgressBarTestIds } from "app-theme/models"
import {
  ComponentProps,
  FunctionComponent,
  TransitionEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react"
import styled from "styled-components"
import { clamp } from "lodash"

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

  const barRef = useRef<HTMLDivElement>(null)
  const clampedValue = clamp(value, 0, maxValue)
  const percentage = (clampedValue / maxValue) * 100
  const isFirstRender = useRef(true)

  const startIndeterminateAnimation = useCallback(() => {
    if (!barRef.current) return

    const widthDifference = Math.abs(percentage - 20)
    const widthTransitionDuration = Math.max(0.15, widthDifference / 100) // Minimum duration of 0.15s

    barRef.current.style.left = "100%"
    barRef.current.style.width = "20%"
    barRef.current.style.transition = `width ${widthTransitionDuration}s linear, left 1s linear`
  }, [percentage])

  const startDeterminateAnimation = useCallback(() => {
    if (!barRef.current) return

    const leftTransitionDuration = percentage > 80 ? 0 : 0.15

    barRef.current.style.left = "0"
    barRef.current.style.width = percentage + "%"
    barRef.current.style.transition = `width 0.15s linear, left ${leftTransitionDuration}s linear`
  }, [percentage])

  const onTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement
      const propertyName = event.propertyName

      if (propertyName !== "left" || !indeterminate) {
        return
      }

      const startsFromLeft =
        !target.style.left || parseInt(target.style.left) < 0

      if (startsFromLeft) {
        target.style.left = "100%"
        target.style.transition = "left 1s linear"
      } else {
        target.style.left = "-20%"
        target.style.transition = "left 1s linear"
      }
    },
    [indeterminate]
  )

  useEffect(() => {
    if (indeterminate) {
      startIndeterminateAnimation()
    } else {
      startDeterminateAnimation()
    }
    isFirstRender.current = false
  }, [indeterminate, startDeterminateAnimation, startIndeterminateAnimation])

  return (
    <Wrapper {...rest}>
      {message !== undefined && (
        <Message key={message} data-testid={ProgressBarTestIds.Description}>
          {message}
        </Message>
      )}
      <Progress
        id={"progress-" + id}
        data-testid={ProgressBarTestIds.Progress}
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuetext={`${clampedValue} ${valueUnit}`}
      >
        <Bar
          ref={barRef}
          $percentage={percentage}
          onTransitionEnd={onTransitionEnd}
        />
      </Progress>
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

const Progress = styled.div`
  width: 100%;
  max-width: 22.3rem;
  height: 0.4rem;
  border-radius: 0.2rem;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.app.color.grey5};
`

const Bar = styled.div<{ $percentage?: number }>`
  position: absolute;
  left: 0;
  top: 0;
  height: inherit;
  border-radius: inherit;
  background-color: ${({ theme }) => theme.app.color.grey1};
  width: ${({ $percentage = 0 }) => $percentage}%;
  transition: width 0.15s linear;
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
