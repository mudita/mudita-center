/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Header3, Header4, Header5 } from "./headers"
import {
  h3Component,
  h4Component,
  h5Component,
  highlightText,
} from "generic-view/models"
import { HighlightText } from "./highlight-text"

export const texts = {
  [h3Component.key]: Header3,
  [h4Component.key]: Header4,
  [h5Component.key]: Header5,
  [highlightText.key]: HighlightText,
}
