/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { FilesManagerProps } from "App/overview/components/files-manager/files-manager.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardContent,
} from "App/overview/components/card.elements"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { convertBytes } from "Renderer/utils/convert-bytes"
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
import { Type } from "Renderer/components/core/icon/icon.config"
import { URL_MAIN } from "Renderer/constants/urls"

const TextInfo = styled(CardContent)`
  > p {
    margin-top: 1.2rem;
    margin-bottom: 0.8rem;
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("secondary")};
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
    fill: ${backgroundColor("row")};
  }
`

const FilesManager: FunctionComponent<FilesManagerProps> = ({
  className,
  usedSpace,
  maxSpace = 16,
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
    id: "module.overview.filesManagerOpenFilesManager",
  })
  return (
    <Card className={className}>
      <TextInfo>
        <SpaceData>
          <Text displayStyle={TextDisplayStyle.TertiaryHeading}>
            {convertBytes(usedSpace)}
          </Text>
          <Text element={"span"} displayStyle={TextDisplayStyle.Label}>
            / {convertBytes(maxSpace)}
          </Text>
        </SpaceData>
        <Text displayStyle={TextDisplayStyle.SmallFadedText}>
          <FormattedMessage id="module.overview.filesManagerUsedSpace" />
        </Text>
        <BarChart chartData={stackedBarData} displayStyle={DisplayStyle.Thin} />
      </TextInfo>
      <CardAction filled>
        <Button
          active
          label={buttonLabel}
          Icon={Type.FilesManager}
          onClick={onFilesOpen}
          to={URL_MAIN.filesManager}
        />
      </CardAction>
    </Card>
  )
}

export default FilesManager
