/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import React from "react"
import {
  RichTextParagraph,
  RichTextSecondaryHeading,
  RichTextTertiaryHeading,
} from "App/__deprecated__/renderer/utils/rich-text/rich-text-components.styled"

export const richTextReactComponentOptions: Options = {
  renderMark: {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
  },
  renderNode: {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    [BLOCKS.HEADING_1]: (_, children) => (
      <Text displayStyle={TextDisplayStyle.Headline1}>{children}</Text>
    ),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    [BLOCKS.HEADING_2]: (_, children) => (
      <RichTextSecondaryHeading>{children}</RichTextSecondaryHeading>
    ),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    [BLOCKS.HEADING_3]: (_, children) => (
      <RichTextTertiaryHeading>{children}</RichTextTertiaryHeading>
    ),
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <RichTextParagraph>{children}</RichTextParagraph>
    ),
  },
}
