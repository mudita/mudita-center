import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { intl } from "Renderer/utils/intl"

interface Props {
  id: string
}

const CaptionDataText: FunctionComponent<Props> = ({ id }) => (
  <Text displayStyle={TextDisplayStyle.SmallFadedText} element={"p"}>
    {intl.formatMessage({
      id,
    })}
  </Text>
)

export default CaptionDataText
