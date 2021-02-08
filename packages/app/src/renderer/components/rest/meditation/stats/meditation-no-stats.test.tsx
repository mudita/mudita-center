import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import MeditationNoStats from "Renderer/components/rest/meditation/stats/meditation-no-stats.component"
import { MeditationNoStatsTestIdsEnum } from "Renderer/components/rest/meditation/stats/meditation-no-stats-test-ids.enum"

const renderer = () => {
  return renderWithThemeAndIntl(<MeditationNoStats />)
}

test("title has correct text", () => {
  const { getByTestId } = renderer()
  expect(
    getByTestId(MeditationNoStatsTestIdsEnum.NoStatsTitle)
  ).toHaveTextContent("[value] view.name.meditation.noStatsTitle")
})

test("subtitle has correct text", () => {
  const { getByTestId } = renderer()
  expect(
    getByTestId(MeditationNoStatsTestIdsEnum.NoStatsSubtitle)
  ).toHaveTextContent("[value] view.name.meditation.noStatsSubtitle")
})
