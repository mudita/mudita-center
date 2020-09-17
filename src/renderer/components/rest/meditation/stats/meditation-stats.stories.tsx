import { storiesOf } from "@storybook/react"
import React from "react"
import MeditationStats from "Renderer/components/rest/meditation/stats/meditation-stats.component"
import Story from "Renderer/components/storybook/story.component"
import { generateMeditationData } from "App/__mocks__/meditation-stats.mock"
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
    </>
  )
})
