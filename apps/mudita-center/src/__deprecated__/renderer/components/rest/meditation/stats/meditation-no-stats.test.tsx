/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import MeditationNoStats from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-no-stats.component"
import { MeditationNoStatsTestIdsEnum } from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-no-stats-test-ids.enum"

const renderer = () => {
  return renderWithThemeAndIntl(<MeditationNoStats />)
}

test("title has correct text", () => {
  const { getByTestId } = renderer()
  expect(
    getByTestId(MeditationNoStatsTestIdsEnum.NoStatsTitle)
  ).toHaveTextContent("[value] module.meditation.noStatsTitle")
})

test("subtitle has correct text", () => {
  const { getByTestId } = renderer()
  expect(
    getByTestId(MeditationNoStatsTestIdsEnum.NoStatsSubtitle)
  ).toHaveTextContent("[value] module.meditation.noStatsSubtitle")
})
