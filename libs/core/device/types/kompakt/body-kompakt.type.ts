/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadKompakt } from "Core/device/types/kompakt/payload-kompakt.type"
import { HeaderKompakt } from "Core/device/types/kompakt/header-kompakt.type"

export type BodyKompakt = PayloadKompakt & Omit<HeaderKompakt, "status | uuid">
