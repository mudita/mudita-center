/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { TextDisplayStyle } from "App/__deprecated__/renderer/components/core/text/text.component"
import {
  NoStatsLargeText,
  NoStatsLightText,
  NoStatsWrapper,
} from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-no-stats.styled"
import { defineMessages } from "react-intl"
import { MeditationNoStatsTestIdsEnum } from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-no-stats-test-ids.enum"

const messages = defineMessages({
  title: { id: "module.meditation.noStatsTitle" },
  subtitle: { id: "module.meditation.noStatsSubtitle" },
})

const MeditationNoStats: FunctionComponent = () => (
  <NoStatsWrapper>
    <NoStatsLargeText
      displayStyle={TextDisplayStyle.Paragraph1}
      message={messages.title}
      data-testid={MeditationNoStatsTestIdsEnum.NoStatsTitle}
    />
    <NoStatsLightText
      displayStyle={TextDisplayStyle.Paragraph3}
      message={messages.subtitle}
      data-testid={MeditationNoStatsTestIdsEnum.NoStatsSubtitle}
      color="secondary"
    />
  </NoStatsWrapper>
)

export default MeditationNoStats
