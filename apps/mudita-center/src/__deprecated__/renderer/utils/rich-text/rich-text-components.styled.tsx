/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { fontWeight } from "App/__deprecated__/renderer/styles/theming/theme-getters"

export const RichTextSecondaryHeading = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Headline2,
}))`
  font-weight: ${fontWeight("default")};
  margin-bottom: 4rem;
`

export const RichTextTertiaryHeading = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Headline3,
}))`
  margin-top: 4rem;
  margin-bottom: 1.6rem;
`

export const RichTextParagraph = styled(Text).attrs(() => ({
  displayStyle: TextDisplayStyle.Paragraph4,
}))`
  margin-bottom: 1.6rem;
`
