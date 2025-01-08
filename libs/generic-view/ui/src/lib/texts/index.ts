/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Header5 } from "./headers"
import { h5Component, highlightText } from "generic-view/models"
import { HighlightText } from "./highlight-text"

export const texts = {
  [h5Component.key]: Header5,
  [highlightText.key]: HighlightText,
}
