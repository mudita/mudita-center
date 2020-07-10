import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const SmallDataText: FunctionComponent<{}> = ({ children }) => (
  <Text displayStyle={TextDisplayStyle.MediumText} element={"span"}>
    {children}
  </Text>
)

export default SmallDataText
