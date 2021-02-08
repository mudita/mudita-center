/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import moment, { MomentInput } from "moment"

export const isToday = (date: MomentInput) =>
  moment(date).isSame(Date.now(), "days")
