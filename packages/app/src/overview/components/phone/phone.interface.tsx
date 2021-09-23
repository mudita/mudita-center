/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour } from "@mudita/pure"

export interface PhoneProps {
  onDisconnect: () => void
  onClick?: () => void
  caseColour?: CaseColour
}
