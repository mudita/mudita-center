/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ButtonText } from "./button-text"
import { ButtonPrimary } from "./button-primary"
import { ButtonSecondary } from "./button-secondary"
import { ButtonIcon } from "./button-icon"
import {
  buttonPrimary,
  buttonSecondary,
  buttonText,
  buttonIcon,
} from "generic-view/models"

export const buttons = {
  [buttonText.key]: ButtonText,
  [buttonPrimary.key]: ButtonPrimary,
  [buttonSecondary.key]: ButtonSecondary,
  [buttonIcon.key]: ButtonIcon,
}
