import { storiesOf } from "@storybook/react"
import React from "react"
import MeditationStats from "Renderer/components/rest/meditation-stats/meditation-stats.component"
import Story from "Renderer/components/storybook/story.component"
import {
  generateMonthlyMeditationData,
  generateWeeklyMediationData,
  generateYearlyMeditationData,
} from "App/__mocks__/meditation-stats.mock"
import { ChartType } from "Renderer/components/rest/meditation-stats/meditation-stats.enum"

storiesOf("Components|Rest/Meditation Stats", module)
  .add("Weekly", () => (
    <Story>
      <MeditationStats
        chartType={ChartType.Weekly}
        data={generateWeeklyMediationData()}
      />
    </Story>
  ))
  .add("Monthly", () => (
    <Story>
      <MeditationStats
        chartType={ChartType.Monthly}
        data={generateMonthlyMeditationData()}
      />
    </Story>
  ))
  .add("Yearly", () => (
    <Story>
      <MeditationStats
        chartType={ChartType.Yearly}
        data={generateYearlyMeditationData()}
      />
    </Story>
  ))
