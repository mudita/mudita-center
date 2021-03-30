/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import FixtureCreator from "./fixture-creator"

const writeJson = jest.fn()

jest.mock("fs-extra", () => ({
  writeJson: (location: string, payload: {}) => writeJson(location, payload),
  pathExists: () => false,
}))

test("correct payload is passed to json under right key", async () => {
  const fixtureCreator = new FixtureCreator()
  const key = "example"
  const payload = [{ contactId: 123 }]
  await fixtureCreator.addFixture(key, payload)
  expect(writeJson).toBeCalledWith("src/fixtures.json", { [`${key}`]: payload })
})
