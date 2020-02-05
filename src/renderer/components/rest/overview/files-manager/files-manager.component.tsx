import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { FilesManagerProps } from "Renderer/components/rest/overview/files-manager/files-manager.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
} from "Renderer/components/rest/overview/card.elements"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import styled from "styled-components"
import { intl } from "Renderer/utils/intl"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import {
  backgroundColor,
  fontWeight,
  letterSpacing,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FolderIcon from "Renderer/svg/files-manager.svg"

const TextInfo = styled(CardText)`
  > p {
    margin-top: 1.2rem;
    margin-bottom: 0.8rem;
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("placeholder")};
  }
`

const SpaceData = styled.div`
  display: flex;
  align-items: baseline;

  span {
    margin-left: 0.8rem;
    font-weight: ${fontWeight("light")};
    text-transform: none;
  }
`

const BarChart = styled(StackedBarChart)`
  width: 12rem;
`

const Button = styled(CardActionButton)`
  svg * {
    fill: ${backgroundColor("light")};
  }
`

const FilesManager: FunctionComponent<FilesManagerProps> = ({
  className,
  usedSpace,
  maxSpace = 16,
  unit = "GB",
  onFilesOpen,
}) => {
  const stackedBarData = [
    {
      value: usedSpace,
      color: "#6d9bbc",
    },
    {
      value: maxSpace - usedSpace,
      color: "#f4f5f6",
    },
  ]

  const buttonLabel = intl.formatMessage({
    id: "view.name.overview.filesManager.openFilesManager",
  })

  return (
    <Card className={className}>
      <TextInfo>
        <SpaceData>
          <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
            {usedSpace}
          </Text>
          <Text element={"span"} displayStyle={TextDisplayStyle.SmallText}>
            /{maxSpace} {unit}
          </Text>
        </SpaceData>
        <Text displayStyle={TextDisplayStyle.SmallFadedText}>
          <FormattedMessage id="view.name.overview.filesManager.usedSpace" />
        </Text>
        <BarChart
          chartData={stackedBarData}
          displayStyle={DisplayStyle.Simple}
        />
      </TextInfo>
      <CardAction filled>
        <Button
          active
          label={buttonLabel}
          Icon={FolderIcon}
          onClick={onFilesOpen}
        />
      </CardAction>
    </Card>
  )
}

export default FilesManager
