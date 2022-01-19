/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import { vol } from "memfs"
import { DirectoryJSON } from "memfs/lib/volume"

jest.mock('fs');

class Indexer extends BaseIndexer {
}

const json: DirectoryJSON = {
  'sync/index.db': '',
};

beforeEach(() => {
  vol.reset()
})

describe("`BaseIndexer`", () => {
  test("`getData` execution works properly ", async () => {
    vol.fromJSON(json, "/");
    const indexer = new Indexer()

    expect(indexer.getData('sync/index.db')).not.toBeUndefined()
  })
})
