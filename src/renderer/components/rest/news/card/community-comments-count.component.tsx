import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

interface Props {
  count?: number
}

const CommunityCommentsCount: FunctionComponent<Props> = ({ count }) => {
  const countString =
    count || count === 0
      ? count > 1
        ? `${count} Comments`
        : count > 0
        ? `${count} Comment`
        : "Be the first to comment"
      : "Loading comments ..."
  return (
    <Text displayStyle={TextDisplayStyle.MediumTextUppercased}>
      {countString}
    </Text>
  )
}

export default CommunityCommentsCount
