import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const LargeDataText: FunctionComponent<{}> = ({ children }) => (
  <Text displayStyle={TextDisplayStyle.PrimaryHeading} element={"span"}>
    {children}
  </Text>
)

export default LargeDataText
