import { BLOCKS } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import * as React from "react"

export const richTextReactComponentOptions: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_, children) => (
      <Text displayStyle={TextDisplayStyle.PrimaryHeading}>{children}</Text>
    ),
  },
}
