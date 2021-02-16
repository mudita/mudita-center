/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { Options } from "@contentful/rich-text-react-renderer"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import React from "react"
import {
  RichTextParagraph,
  RichTextSecondaryHeading,
  RichTextTertiaryHeading,
} from "Renderer/utils/rich-text/rich-text-components.styled"

export const richTextReactComponentOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text) => <u>{text}</u>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (_, children) => (
      <Text displayStyle={TextDisplayStyle.PrimaryHeading}>{children}</Text>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <RichTextSecondaryHeading>{children}</RichTextSecondaryHeading>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <RichTextTertiaryHeading>{children}</RichTextTertiaryHeading>
    ),
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <RichTextParagraph>{children}</RichTextParagraph>
    ),
  },
}
