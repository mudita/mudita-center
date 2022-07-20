/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  backgroundColor,
  borderRadius,
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "App/__deprecated__/renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { ChartType } from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-stats.enum"

const getBarWidth = (type: ChartType) => {
  switch (type) {
    case ChartType.Monthly:
      return 1.7
    case ChartType.Yearly:
      return 5.6
    case ChartType.Weekly:
    default:
      return 6.5
  }
}

const activeBarStyles = css`
  background-color: ${backgroundColor("activity")};
`

const disabledBarStyles = css`
  background-color: ${backgroundColor("disabled")};
  pointer-events: none;
`

const activeTooltipStyles = css`
  opacity: 1;
  visibility: visible;
`

const referenceLineStyles = css`
  position: absolute;
  width: 0.1rem;
  height: 108%;
  bottom: 0;
  left: calc(50% - 0.1rem);
  background-image: linear-gradient(
    ${backgroundColor("activity")} 60%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: right;
  background-size: 0.1rem 4%;
  background-repeat: repeat-y;
`

const barWrapperActiveStyles = css`
  &:before {
    content: "";
    ${referenceLineStyles};
  }
`

const xAxisLabelStyles = css<{ active?: boolean }>`
  position: absolute;
  bottom: -3rem;
  width: 100%;
  text-align: center;
  font-weight: ${({ active }) => (active ? 600 : 400)};
`

export const HorizontalLine = styled.div<{ position: number }>`
  position: absolute;
  bottom: ${({ position }) => position}%;
  left: 8rem;
  width: calc(100% - 8rem);
  height: 0.1rem;
  background-color: ${backgroundColor("minor")};

  &:first-child {
    left: 0;
    width: 100%;
  }
`

export const Label = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Label,
  color: "disabled"
}))<{ position?: number }>`
  bottom: ${({ position = 0 }) => position}%;
`

export const YAxisTitle = styled(Label)`
  position: absolute;
  left: 0;
  bottom: -3rem;
  text-transform: uppercase;
  opacity: 0.5;
  text-align: left !important;
`

export const YAxis = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 8rem;
  height: 100%;

  ${Label} {
    left: 0;
    position: absolute;
    transform: translateY(calc(50% - 0.1rem));
  }
`

export const Grid = styled.div`
  grid-area: Content;
  position: relative;
  z-index: 0;
`

export const Tooltip = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(100% + 1.2rem);
  min-width: 7.2rem;
  height: 3.8rem;
  padding: 0 1rem;
  box-sizing: border-box;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  border-radius: ${borderRadius("medium")};
  background-color: ${backgroundColor("minor")};
  transition: opacity ${transitionTime("quick")}
      ${transitionTimingFunction("easeInOut")},
    visibility ${transitionTime("quick")}
      ${transitionTimingFunction("easeInOut")};

  p {
    color: ${textColor("primary")};
  }
`

export const Bar = styled.div<{
  height: number
}>`
  cursor: pointer;
  position: relative;
  height: ${({ height }) => height + "%"};
  background-color: ${backgroundColor("chartBar")};
  border-radius: 0.5rem 0.5rem 0 0;
  transition: background-color ${transitionTime("quick")}
    ${transitionTimingFunction("easeInOut")};

  &:hover {
    ${activeBarStyles};
    ${Tooltip} {
      ${activeTooltipStyles};
    }
  }
`

export const BarWrapper = styled.div<{ active?: boolean; disabled?: boolean }>`
  position: relative;
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  ${Label} {
    ${xAxisLabelStyles};
  }

  ${({ active }) =>
    active &&
    css`
      ${barWrapperActiveStyles};
      ${Bar} {
        ${activeBarStyles};
      }
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      ${Bar} {
        ${disabledBarStyles};
      }
    `};
`

export const GroupWrapper = styled.div<{ active?: boolean; bars: number }>`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  flex: ${({ bars }) => bars};

  &:not(:last-of-type) {
    border-right: solid 0.1rem ${backgroundColor("minor")};
  }

  ${Label} {
    ${xAxisLabelStyles};
  }
`

export const Bars = styled.div`
  grid-area: Content;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-left: 8rem;
  position: relative;
  z-index: 1;
`

export const Chart = styled.section<{ chartType: ChartType }>`
  flex: 1;
  display: grid;
  grid-template-areas: "Content";
  min-height: 35rem;
  min-width: 85rem;
  padding-top: 4rem;
  padding-bottom: 3rem;
  box-sizing: border-box;

  ${Bar} {
    width: ${({ chartType }) => getBarWidth(chartType)}rem;
    min-height: ${({ chartType }) =>
      chartType === ChartType.Monthly ? 0.4 : 0.8}rem;
  }
`
