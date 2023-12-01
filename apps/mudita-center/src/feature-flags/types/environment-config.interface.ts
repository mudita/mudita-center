/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Feature, Environment } from "App/feature-flags/constants"

export type EnvironmentConfig = Record<Feature, Record<Environment, boolean>>
