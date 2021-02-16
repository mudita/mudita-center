/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React, { useState } from "react"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import DataBoxes from "Renderer/components/rest/meditation/data-box/data-boxes.component"
import MeditationNav from "Renderer/components/rest/meditation/nav/meditation-nav.component"
import MeditationStats from "Renderer/components/rest/meditation/stats/meditation-stats.component"
import ButtonToggler, {
  ButtonTogglerItem,
} from "Renderer/components/core/button-toggler/button-toggler.component"
import { ChartType } from "Renderer/components/rest/meditation/stats/meditation-stats.enum"
import { generateMeditationData } from "App/__mocks__/meditation-stats.mock"
import {
  MeditationStatsWrapper,
  MeditationWrapper,
  NavigationWrapper,
} from "Renderer/modules/meditation/meditation.styled"
import MeditationNoStats from "App/renderer/components/rest/meditation/stats/meditation-no-stats.component"

const messages = defineMessages({
  weekly: {
    id: "view.generic.weekly",
  },
  monthly: {
    id: "view.generic.monthly",
  },
  yearly: {
    id: "view.generic.yearly",
  },
})

interface MeditationProps {
  stats: []
}

const Meditation: FunctionComponent<MeditationProps> = ({ stats }) => {
  const [chartType, setChartType] = useState<ChartType>(ChartType.Weekly)
  const selectChartType = (type: ChartType) => () => setChartType(type)

  return (
    <MeditationWrapper data-testid={chartType}>
      <NavigationWrapper>
        <ButtonToggler>
          <ButtonTogglerItem
            active={chartType === ChartType.Weekly}
            label={intl.formatMessage(messages.weekly)}
            onClick={selectChartType(ChartType.Weekly)}
          />
          <ButtonTogglerItem
            active={chartType === ChartType.Monthly}
            label={intl.formatMessage(messages.monthly)}
            onClick={selectChartType(ChartType.Monthly)}
          />
          <ButtonTogglerItem
            active={chartType === ChartType.Yearly}
            label={intl.formatMessage(messages.yearly)}
            onClick={selectChartType(ChartType.Yearly)}
          />
        </ButtonToggler>
        <MeditationNav startDate={"2020-09-11"} />
      </NavigationWrapper>
      <MeditationStatsWrapper>
        <MeditationStats
          chartType={chartType}
          statsData={generateMeditationData(chartType)}
        />
      </MeditationStatsWrapper>
      {stats?.length ? <DataBoxes /> : <MeditationNoStats />}
    </MeditationWrapper>
  )
}

export default Meditation
