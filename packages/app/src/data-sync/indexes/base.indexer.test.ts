/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { vol } from "memfs"
import { DirectoryJSON } from "memfs/lib/volume"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"

jest.mock("fs")

class Indexer extends BaseIndexer {}

const json: DirectoryJSON = {
  "sync/index.db": "",
}

beforeEach(() => {
  vol.reset()
})

describe("`BaseIndexer`", () => {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("`getData` execution works properly", async () => {
    vol.fromJSON(json, "/")
    const indexer = new Indexer(new FileSystemService())

    expect(
      indexer.getData("sync/index.db", "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa")
    ).not.toBeUndefined()
  })

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  test("`getData` returns `null` if file doesn't exists", async () => {
    vol.fromJSON(json, "/")
    const indexer = new Indexer(new FileSystemService())

    expect(
      indexer.getData("sync/not-existed.db", "Nr8uiSV7KmWxX3WOFqZPF7uB+Zx8qaPa")
    ).not.toBeUndefined()
  })
})
