/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EntitiesLoader } from "./entities-loader"
import { entitiesLoader } from "generic-view/models"

export const entities = {
  [entitiesLoader.key]: EntitiesLoader,
}
