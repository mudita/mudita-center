/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "reflect-metadata"
import "p-queue"

jest.mock("p-queue", () => {
  return jest.fn().mockImplementation(() => {
    return {
      add: jest.fn(),
    }
  })
})
