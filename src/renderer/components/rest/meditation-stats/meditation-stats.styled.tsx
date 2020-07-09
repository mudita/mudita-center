import styled, { css } from "styled-components"
import {
  backgroundColor,
  borderRadius,
  boxShadowColor,
  textColor,
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { ChartType } from "Renderer/components/rest/meditation-stats/meditation-stats.component"

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

export const HorizontalLine = styled.div<{ position: number }>`
  position: absolute;
  bottom: ${({ position }) => position}%;
  left: 8rem;
  width: calc(100% - 8rem);
  height: 0.1rem;
  background-color: ${backgroundColor("chartAxisLine")};

  &:first-child {
    left: 0;
    width: 100%;
  }
`

export const Label = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.SmallFadedText,
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
`

const activeTooltipStyles = css`
  opacity: 1;
  visibility: visible;
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
  box-shadow: 0 1rem 5.5rem -0.5rem ${boxShadowColor("semi")};
  background-color: ${backgroundColor("chartTooltip")};
  transition: opacity ${transitionTime("quick")}
      ${transitionTimingFunction("easeInOut")},
    visibility ${transitionTime("quick")}
      ${transitionTimingFunction("easeInOut")};

  p {
    color: ${textColor("primary")};
  }
`

const activeBarStyles = css`
  background-color: ${backgroundColor("activity")};
`

const disabledBarStyles = css`
  background-color: ${backgroundColor("chartBarInactive")};
  pointer-events: none;
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

const xAxisLabelStyles = css<{ active?: boolean }>`
  position: absolute;
  bottom: -3rem;
  width: 100%;
  text-align: center;
  font-weight: ${({ active }) => (active ? 600 : 400)};
`

const barWrapperActiveStyles = css`
  &:before {
    content: "";
    ${referenceLineStyles};
  }

  ${Bar} {
    ${activeBarStyles};
  }
`

const barWrapperDisabledStyles = css`
  ${Bar} {
    ${disabledBarStyles};
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

  ${({ active }) => active && barWrapperActiveStyles};
  ${({ disabled }) => disabled && barWrapperDisabledStyles};
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
    border-right: solid 0.1rem ${backgroundColor("chartAxisLine")};
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
