/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import path from "path"

interface FixtureCreatorInterface {
  readonly fixturesLocation: string
  addFixture(key: string, payload: {}): Promise<void>
  jsonExists(): Promise<boolean>
}

class FixtureCreator implements FixtureCreatorInterface {
  fixturesLocation = "src/fixtures.json"

  async jsonExists(): Promise<boolean> {
    return await fs.pathExists(path.resolve(this.fixturesLocation))
  }

  async addFixture(key: string, payload: Record<string, any>): Promise<void> {
    if (await this.jsonExists()) {
      const oldFixtures = await fs.readJson(path.resolve(this.fixturesLocation))
      if (Object.keys(oldFixtures).includes(key)) {
        return
      }
      await fs.writeJson(this.fixturesLocation, {
        ...oldFixtures,
        [`${key}`]: payload,
      })
    } else {
      await fs.writeJson(this.fixturesLocation, { [`${key}`]: payload })
    }
  }
}

export default FixtureCreator
