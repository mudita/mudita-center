/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import MeditationStats from "Renderer/components/rest/meditation/stats/meditation-stats.component"
import Story from "Renderer/components/storybook/story.component"
import {
  generateMeditationData,
  statsWeekly,
} from "App/__mocks__/meditation-stats.mock"
import { ChartType } from "Renderer/components/rest/meditation/stats/meditation-stats.enum"

storiesOf("Components/Rest/Meditation", module).add("Stats", () => {
  return (
    <>
      <Story title="Weekly">
        <MeditationStats
          chartType={ChartType.Weekly}
          statsData={generateMeditationData()}
        />
      </Story>
      <Story title="Monthly">
        <MeditationStats
          chartType={ChartType.Monthly}
          statsData={generateMeditationData(ChartType.Monthly)}
        />
      </Story>
      <Story title="Yearly">
        <MeditationStats
          chartType={ChartType.Yearly}
          statsData={generateMeditationData(ChartType.Yearly)}
        />
      </Story>
      <Story title="No Data">
        <MeditationStats chartType={ChartType.Weekly} statsData={statsWeekly} />
      </Story>
    </>
  )
})
