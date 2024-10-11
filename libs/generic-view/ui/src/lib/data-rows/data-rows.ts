/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IconText } from "./icon-text/icon-text"
import { Image } from "./image"
import { LabeledText } from "./labeled-text"
import { TextPlain } from "./text-plain"
import { TextFormatted } from "./text-formatted"
import { Badge } from "./badge"
import { AppPortal } from "./app-portal"
import {
  appPortal,
  badge,
  iconText,
  image,
  labeledText,
  textFormatted,
  textPlain,
} from "generic-view/models"

export const rows = {
  [iconText.key]: IconText,
  [labeledText.key]: LabeledText,
  [image.key]: Image,
  [textPlain.key]: TextPlain,
  [textFormatted.key]: TextFormatted,
  [badge.key]: Badge,
  [appPortal.key]: AppPortal,
}
