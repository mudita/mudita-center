/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { BaseIndexer } from "App/data-sync/indexes/base.indexer"
import DeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-adapter.class"
import createFakeDeviceBackupAdapter from "Backend/adapters/device-backup/device-backup-fake.adapter"
import getAppPath from "App/main/utils/get-app-path"
import DeviceResponse, { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { vol } from "memfs"
import { DirectoryJSON } from "memfs/lib/volume"
jest.mock("App/main/utils/get-app-path")
jest.mock("Backend/adapters/device-backup/device-backup-fake.adapter")
jest.mock('fs');
jest.mock('App/data-sync/helpers');

class Indexer extends BaseIndexer {
  constructor(deviceBackup: DeviceBackupAdapter) {
    super(deviceBackup)
  }
}

const successGetBackupLocationResponse: DeviceResponse<string[]> = {
  status: DeviceResponseStatus.Ok,
  data: ["path/to/directory"],
}

const json: DirectoryJSON = {
  'path/to/directory': '',
  'sync/index.db': '',
};

beforeEach(() => {
  vol.reset()
})

describe("`BaseIndexer`", () => {
  test("listener execute `getIndex` method properly", async () => {
    vol.fromJSON(json, "/");

    ;(getAppPath as unknown as jest.Mock).mockImplementation(() => "")
    ;(createFakeDeviceBackupAdapter as unknown as jest.Mock).mockImplementation(
      () => {
        return {
          backuping: true,
          downloadDeviceBackupLocally: () => successGetBackupLocationResponse
        }
      }
    )

    const deviceBackup = createFakeDeviceBackupAdapter()
    const indexer = new Indexer(deviceBackup)

    expect(indexer.getData("index.db")).not.toBeUndefined()
  })
})
