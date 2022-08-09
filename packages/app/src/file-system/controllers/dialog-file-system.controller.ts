/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { ResultObject } from "App/core/builder"
import {
  DialogControllerPrefix,
  IpcDialogFileSystemEvent,
} from "App/file-system/constants"
import { GetPathInput } from "App/file-system/dto"
import { FilesSystemDialogService } from "App/file-system/services/file-system-dialog.service"

@Controller(DialogControllerPrefix)
export class DialogFileSystemController {
  constructor(private filesSystemDialogService: FilesSystemDialogService) {}

  @IpcEvent(IpcDialogFileSystemEvent.GetPaths)
  public async getPaths({
    filters = [],
    properties,
  }: GetPathInput): Promise<ResultObject<string[] | undefined>> {
    return this.filesSystemDialogService.getPaths(filters, properties)
  }
}
