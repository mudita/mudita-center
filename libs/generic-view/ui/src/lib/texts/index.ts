/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Header3, Header4, Header5 } from "./headers"
import { Paragraph4, Paragraph5 } from "./paragraphs"
import {
  h3Component,
  h4Component,
  h5Component,
  highlightText,
  p4Component,
  p5Component,
} from "generic-view/models"
import { HighlightText } from "./highlight-text"

export const texts = {
  [h3Component.key]: Header3,
  [h4Component.key]: Header4,
  [h5Component.key]: Header5,
  [p4Component.key]: Paragraph4,
  [p5Component.key]: Paragraph5,
  [highlightText.key]: HighlightText,
}
