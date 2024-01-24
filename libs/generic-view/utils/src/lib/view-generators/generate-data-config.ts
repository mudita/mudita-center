/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { isEmpty } from "lodash"

export type Feature = Record<string, unknown>

export const generateDataConfig = (features: (Feature | undefined)[]) => {
  return (features.filter((feature) => !isEmpty(feature)) as Feature[]).reduce(
    (acc, feature) => ({
      ...acc,
      ...feature,
    }),
    {}
  )
}
