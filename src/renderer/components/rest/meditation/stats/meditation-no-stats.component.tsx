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

const messages = defineMessages({
  title: { id: "view.name.meditation.noStatsTitle" },
  subtitle: { id: "view.name.meditation.noStatsSubtitle" },
})

const MeditationNoStats: FunctionComponent = () => (
  <NoStatsWrapper>
    <Icon type={Type.MuditaFlower} height={5.6} />
    <NoStatsLargeText
      displayStyle={TextDisplayStyle.TertiaryBoldHeading}
      message={messages.title}
    />
    <NoStatsLightText
      displayStyle={TextDisplayStyle.MediumFadedLightText}
      message={messages.subtitle}
    />
  </NoStatsWrapper>
)

export default MeditationNoStats
