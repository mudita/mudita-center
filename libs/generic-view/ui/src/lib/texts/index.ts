/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Header3, Header4, Header5 } from "./headers"
import { Paragraph1, Paragraph2, Paragraph3 } from "./paragraphs"
import {
  h3Component,
  h4Component,
  h5Component,
  p1Component,
  p2Component,
  p3Component,
} from "generic-view/models"

export const texts = {
  [h3Component.key]: Header3,
  [h4Component.key]: Header4,
  [h5Component.key]: Header5,
  [p1Component.key]: Paragraph1,
  [p2Component.key]: Paragraph2,
  [p3Component.key]: Paragraph3,
}
