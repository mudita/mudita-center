/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { IpcEvent } from "Core/core/decorators"
import { IndexStorageService } from "Core/index-storage/services"
import { IpcIndexStorageEvent } from "Core/index-storage/constants/controller.constant"
import { InitializeOptions } from "Core/data-sync/types"

export class IndexStorageController {
  constructor(private indexStorageService: IndexStorageService) {}

  @IpcEvent(IpcIndexStorageEvent.LoadIndex)
  public loadIndex(options: InitializeOptions): Promise<boolean> {
    return this.indexStorageService.loadIndex(options)
  }

  @IpcEvent(IpcIndexStorageEvent.SaveIndex)
  public saveIndex(options: InitializeOptions): Promise<void> {
    return this.indexStorageService.saveIndex(options)
  }
}
