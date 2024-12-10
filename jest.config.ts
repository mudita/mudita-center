/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getJestProjectsAsync } from "@nx/jest"

void (async () => {
  const p = await getJestProjectsAsync()
  console.log(p)
})()

export default async () => ({
  projects: await getJestProjectsAsync(),
})
