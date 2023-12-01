/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {  IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import {
  IpcDialogFileSystemEvent,
} from "App/file-system/constants"
import { GetPathsInput } from "App/file-system/dto"
import { FilesSystemDialogService } from "App/file-system/services/file-system-dialog.service"

export class DialogFileSystemController {
  constructor(private filesSystemDialogService: FilesSystemDialogService) {}

  @IpcEvent(IpcDialogFileSystemEvent.GetPaths)
  public async getPaths({
    filters = [],
    properties,
  }: GetPathsInput): Promise<ResultObject<string[] | undefined>> {
    return this.filesSystemDialogService.getPaths(filters, properties)
  }
}
