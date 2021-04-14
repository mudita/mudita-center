/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedDate } from "react-intl"
import TranslationMessages from "Renderer/components/core/translations-tooltip/translation-messages.component"

interface Props {
  online?: boolean
  date?: string
}

const LastUpdate: FunctionComponent<Props> = ({
  className,
  online = false,
  date,
}) => (
  <Text
    displayStyle={TextDisplayStyle.MediumFadedLightText}
    className={className}
  >
    {!online && <TranslationMessages id="view.name.news.offlineText" />}{" "}
    {date && (
      <>
        <TranslationMessages id="view.name.news.lastUpdate" />
        <FormattedDate
          value={new Date(date)}
          year="numeric"
          month="short"
          day="2-digit"
        />
      </>
    )}
  </Text>
)

export default LastUpdate
