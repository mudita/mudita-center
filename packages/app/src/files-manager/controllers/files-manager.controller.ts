/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import {
  ControllerPrefix,
  IpcFilesManagerEvent,
} from "App/files-manager/constants"
import { MetadataDeviceFile } from "App/files-manager/reducers"
import { RequestResponse, RequestResponseStatus } from "App/core/types"

@Controller(ControllerPrefix)
export class FilesManagerController {
  @IpcEvent(IpcFilesManagerEvent.GetFiles)
  public async getFiles(): Promise<RequestResponse<MetadataDeviceFile[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [
        {
          id: "user/music/example_file_name.mp3",
          size: 1234,
          name: "example_file_name.mp3",
          type: "mp3",
        },
        {
          id: "user/music/second_example_file_name.wav",
          size: 12345,
          name: "second_example_file_name.wav",
          type: "wav",
        },
      ],
    }
  }
}
