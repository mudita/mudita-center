import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"

interface Props {
  count?: number
}

const CommunityCommentsCount: FunctionComponent<Props> = ({ count }) => {
  return (
    <Text displayStyle={TextDisplayStyle.MediumTextUppercased}>
      {count === undefined ? (
        <FormattedMessage id="view.name.news.cardCommunityCommentsLoading" />
      ) : (
        <FormattedMessage
          id="view.name.news.cardCommunityComments"
          values={{ count }}
        />
      )}
    </Text>
  )
}

export default CommunityCommentsCount
