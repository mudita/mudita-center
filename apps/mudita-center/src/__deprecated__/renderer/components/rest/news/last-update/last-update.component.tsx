/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { FormattedDate, FormattedMessage } from "react-intl"

interface Props {
  online?: boolean
  date?: string
}

const LastUpdate: FunctionComponent<Props> = ({
  className,
  online = false,
  date,
}) => (
  <Text displayStyle={TextDisplayStyle.Paragraph4} className={className}>
    {!online && <FormattedMessage id="module.news.offlineText" />}{" "}
    {date && (
      <>
        <FormattedMessage id="module.news.lastUpdate" />
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
