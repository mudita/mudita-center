/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { ResultObject } from "Core/core/builder"
import { IpcFileSystemDialogEvent } from "./controller.constant"
import { GetPathsInput } from "./get-paths-input.object"
import { FileSystemDialogService } from "./file-system-dialog.service"

export class FileSystemDialogController {
  constructor(private filesSystemDialogService: FileSystemDialogService) {}

  @IpcEvent(IpcFileSystemDialogEvent.GetPaths)
  public async getPaths({
    filters = [],
    properties,
  }: GetPathsInput): Promise<ResultObject<string[] | undefined>> {
    return this.filesSystemDialogService.getPaths(filters, properties)
  }
}
