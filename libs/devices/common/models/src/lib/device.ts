/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDevice } from "devices/api-device/models"
import { Harmony } from "devices/harmony/models"

// TODO: Extend this type by other device types
export type Device = Pick<ApiDevice | Harmony, "path" | "deviceType">
