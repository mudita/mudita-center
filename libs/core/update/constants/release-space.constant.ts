/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { OsEnvironment } from "Core/update/constants/os-environment.constant"

export const RELEASE_SPACE =
  (process.env.FEATURE_TOGGLE_RELEASE_ENVIRONMENT as OsEnvironment) ||
  OsEnvironment.Production
