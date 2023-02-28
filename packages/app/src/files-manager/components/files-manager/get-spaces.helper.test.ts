/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getSpaces } from "App/files-manager/components/files-manager/get-spaces.helper"
import { File } from "App/files-manager/dto"

describe("`getSpaces` helper", () => {
  describe("when files list is empty", () => {
    const { musicSpace, freeSpace, usedMemorySpace, reservedSpace, otherSpace } =
      getSpaces([], {
        reservedSpace: 50,
        usedUserSpace: 100,
        total: 500,
      })

    test("`musicSpace` is equal to 0", () => {
      expect(musicSpace).toEqual(0)
    })

    test("`freeSpace` is returns properly", () => {
      expect(freeSpace).toEqual(350)
    })

    test("`usedMemorySpace` is returns properly", () => {
      expect(usedMemorySpace).toEqual(150)
    })

    test("`reservedSpace` is returns properly", () => {
      expect(reservedSpace).toEqual(50)
    })

    test("`otherSpace` is returns properly", () => {
      expect(otherSpace).toEqual(100)
    })
  })

  describe("when files list isn't empty", () => {
    const { musicSpace, freeSpace, usedMemorySpace, reservedSpace, otherSpace } =
      getSpaces([{ size: 10 } as File, { size: 20 } as File], {
        reservedSpace: 50,
        usedUserSpace: 100,
        total: 500,
      })

    test("`musicSpace` is equal to 0", () => {
      expect(musicSpace).toEqual(30)
    })

    test("`freeSpace` is returns properly", () => {
      expect(freeSpace).toEqual(350)
    })

    test("`usedMemorySpace` is returns properly", () => {
      expect(usedMemorySpace).toEqual(150)
    })

    test("`reservedSpace` is returns properly", () => {
      expect(reservedSpace).toEqual(50)
    })

    test("`otherSpace` is returns properly", () => {
      expect(otherSpace).toEqual(70)
    })
  })
})
