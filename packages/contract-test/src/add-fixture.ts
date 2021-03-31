/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import path from "path"

const FIXTURES_LOCATION = "src/fixtures.json" as const

const jsonExists = async (): Promise<boolean> => {
  return await fs.pathExists(path.resolve(FIXTURES_LOCATION))
}

const addFixture = async (
  key: string,
  payload: Record<string, any>
): Promise<void> => {
  if (await jsonExists()) {
    const oldFixtures = await fs.readJson(path.resolve(FIXTURES_LOCATION))
    if (Object.keys(oldFixtures).includes(key)) {
      return
    }
    await fs.writeJson(FIXTURES_LOCATION, {
      ...oldFixtures,
      [`${key}`]: payload,
    })
  } else {
    await fs.writeJson(FIXTURES_LOCATION, { [`${key}`]: payload })
  }
}

export default addFixture
