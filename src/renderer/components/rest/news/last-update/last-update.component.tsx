import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedDate, FormattedMessage } from "react-intl"

interface Props {
  offline?: boolean
  date?: string
}

const LastUpdate: FunctionComponent<Props> = ({
  className,
  offline = false,
  date,
}) => (
  <Text
    displayStyle={TextDisplayStyle.MediumFadedLightText}
    className={className}
  >
    {offline && <FormattedMessage id="view.name.news.offlineText" />}{" "}
    {date && (
      <>
        <FormattedMessage id="view.name.news.lastUpdate" />
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
