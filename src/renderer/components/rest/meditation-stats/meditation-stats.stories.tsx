import { storiesOf } from "@storybook/react"
import React from "react"
import MeditationStats from "Renderer/components/rest/meditation-stats/meditation-stats.component"
import Story from "Renderer/components/storybook/story.component"
import { generateMeditationData } from "App/__mocks__/meditation-stats.mock"
import { ChartType } from "Renderer/components/rest/meditation-stats/meditation-stats.enum"

storiesOf("Components|Rest/Meditation Stats", module)
  .add("Weekly", () => {
    return (
      <Story>
        <MeditationStats
          chartType={ChartType.Weekly}
          statsData={generateMeditationData()}
        />
      </Story>
    )
  })
  .add("Monthly", () => (
    <Story>
      <MeditationStats
        chartType={ChartType.Monthly}
        statsData={generateMeditationData(ChartType.Monthly)}
      />
    </Story>
  ))
  .add("Yearly", () => (
    <Story>
      <MeditationStats
        chartType={ChartType.Yearly}
        statsData={generateMeditationData(ChartType.Yearly)}
      />
    </Story>
  ))
