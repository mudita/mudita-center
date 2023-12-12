/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { IpcDialogFileSystemEvent } from "Core/file-system/constants"
import { GetPathsInput } from "Core/file-system/dto"
import { FilesSystemDialogService } from "Core/file-system/services/file-system-dialog.service"

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
