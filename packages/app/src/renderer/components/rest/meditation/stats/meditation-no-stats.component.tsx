/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import { TextDisplayStyle } from "Renderer/components/core/text/text.component"
import {
  NoStatsLargeText,
  NoStatsLightText,
  NoStatsWrapper,
} from "Renderer/components/rest/meditation/stats/meditation-no-stats.styled"
import { defineMessages } from "react-intl"
import { MeditationNoStatsTestIdsEnum } from "Renderer/components/rest/meditation/stats/meditation-no-stats-test-ids.enum"

const messages = defineMessages({
  title: { id: "view.name.meditation.noStatsTitle" },
  subtitle: { id: "view.name.meditation.noStatsSubtitle" },
})

const MeditationNoStats: FunctionComponent = () => (
  <NoStatsWrapper>
    <Icon type={Type.MuditaFlower} height={5.6} />
    <NoStatsLargeText
      displayStyle={TextDisplayStyle.TertiaryHeading}
      message={messages.title}
      data-testid={MeditationNoStatsTestIdsEnum.NoStatsTitle}
    />
    <NoStatsLightText
      displayStyle={TextDisplayStyle.MediumFadedLightText}
      message={messages.subtitle}
      data-testid={MeditationNoStatsTestIdsEnum.NoStatsSubtitle}
    />
  </NoStatsWrapper>
)

export default MeditationNoStats
