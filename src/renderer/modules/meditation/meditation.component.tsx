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
import DevModeWrapper from "Renderer/components/rest/dev-mode-wrapper/dev-mode-wrapper.container"
import Button from "Renderer/components/core/button/button.component"

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

const Meditation: FunctionComponent = () => {
  const [chartType, setChartType] = useState<ChartType>(ChartType.Weekly)
  const [stats, setStats] = useState(true)
  const selectChartType = (type: ChartType) => () => setChartType(type)
  const _devSetStats = () => setStats((stat) => !stat)
  return (
    <MeditationWrapper>
      <DevModeWrapper>
        <Button onClick={_devSetStats} label="Show no stats component" />
      </DevModeWrapper>
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
      {stats ? <DataBoxes /> : <MeditationNoStats />}
    </MeditationWrapper>
  )
}

export default Meditation
