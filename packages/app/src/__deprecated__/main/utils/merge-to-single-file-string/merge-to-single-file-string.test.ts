/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import fs from "fs"
import mock from "mock-fs"
import { mergeToSingleFileString } from "App/__deprecated__/main/utils/merge-to-single-file-string/merge-to-single-file-string"

describe("`mergeToSingleFileString` functionality", () => {
  beforeAll(() => {
    mock(
      {
        "2021-12-07-1kb":
          "The pain itself is love, the main storage system. Mauris lobortis non justo vel auctor. There should be no free housing, the flavor of it is worth it, before the fermentation is done. Mauris commodo ultrices enim ac pretium. There is no fear of the torturer, the hairstyle at the gate as, vengeful and free. Each sad, elite need of teenagers want, the bow eros economics laughter, the cartoon Vikings hate or sem. And so the earth does not stop at the price No cost bow to the main investment. The complete pull of the sheets in the kitchen cushion, in the end of the patches always. The disease is just as nice as the borders of the spectrum. A wise man should start, who needs to start, the biggest thing to start. We live without a cushion of propaganda, or sometimes mourning needs. Tomorrow the players take a ball, or the urn will not be completed, for the sad lace. The quivering arrows of the film No vehicles of any kind. There is no great football button. Now the ferry, the urn or the eas\n",
        "mc-2021-12-07-1kb.txt":
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis non justo vel auctor. Nullam dui libero, condimentum id dui sit amet, fringilla fermentum ante. Mauris commodo ultrices enim ac pretium. Nulla tortor metus, imperdiet at porta ut, ultrices et nibh. Quisque tristique, elit eget eleifend egestas, arcu eros aliquet risus, viverra malesuada augue odio vel sem. Proin tincidunt lobortis tellus non pretium. Nullam pretium arcu ut consectetur euismod. Integer viverra dui in sapien pulvinar, in semper orci finibus. Morbi ultricies quam eu neque placerat finibus. Vestibulum sapien nibh, tincidunt quis convallis eget, convallis maximus mauris. Vivamus pulvinar augue nulla, vel luctus nunc interdum eget. Cras nisl nibh, efficitur vel urna nec, tristique lacinia enim. Duis pharetra iaculis augue. Nulla vehicula aliquam volutpat. Nulla eu felis magna. Nunc porttitor, urna vel facilisis tincidunt, mauris risus tristique dui, sed viverra quam ligula ac nulla. Donec sagittis duu.\n",
        "mc-2022-02-23-1kb.txt":
          "The pain itself is love, the main storage system. Mauris lobortis non justo vel auctor. There should be no free housing, the flavor of it is worth it, before the fermentation is done. Mauris commodo ultrices enim ac pretium. There is no fear of the torturer, the hairstyle at the gate as, vengeful and free. Each sad, elite need of teenagers want, the bow eros economics laughter, the cartoon Vikings hate or sem. And so the earth does not stop at the price No cost bow to the main investment. The complete pull of the sheets in the kitchen cushion, in the end of the patches always. The disease is just as nice as the borders of the spectrum. A wise man should start, who needs to start, the biggest thing to start. We live without a cushion of propaganda, or sometimes mourning needs. Tomorrow the players take a ball, or the urn will not be completed, for the sad lace. The quivering arrows of the film No vehicles of any kind. There is no great football button. Now the ferry, the urn or the eas\n",
      },
      { createCwd: false, createTmp: false }
    )
  })
  afterAll(() => {
    mock.restore()
  })
  const cwd = process.cwd()
  test("returns length value properly ", () => {
    const file = mergeToSingleFileString({
      cwd,
    })

    expect(file.length).toEqual(3003)
  })

  test("returns files dived by divider properly", () => {
    const file = mergeToSingleFileString({
      cwd,
      fileNameDivider: true,
    })

    expect(file).toContain("========== mc-2022-02-23-1kb.txt ==========")
  })

  test("filters files via `fileNameRegExp` works properly", () => {
    const file = mergeToSingleFileString({
      cwd,
      fileNameRegExp: /^mc-.*\.txt$/,
    })
    expect(file.length).toEqual(2002)
  })

  test("truncate returned value via `maxSize` properly", () => {
    const file = mergeToSingleFileString({
      cwd,
      fileNameRegExp: /^mc-.*\.txt$/,
      maxSize: 1000,
    })
    expect(file.length).toEqual(1000)
  })

  test.skip("truncate value is a return from the latest file", () => {
    const latestFileBuffer = fs.readFileSync(
      path.join(cwd, "mc-2022-02-23-1kb.txt")
    )
    const file = mergeToSingleFileString({
      cwd,
      fileNameRegExp: /^mc-.*\.txt$/,
      maxSize: 1000,
    })
    expect(file).toEqual(latestFileBuffer.toString())
  })
})
