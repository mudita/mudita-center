/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import StorageCategoryInfo from "App/__deprecated__/common/interfaces/storage-category-info.interface"
import { RequestResponse } from "App/core/types/request-response.interface"

export default abstract class PurePhoneStorageAdapter {
  public abstract getSystemReservedSpace(): Promise<RequestResponse<number>>
  public abstract getUsedUserSpace(): Promise<RequestResponse<number>>
  public abstract getStorageCategories(): StorageCategoryInfo[]
  public abstract getTotalSpace(): Promise<RequestResponse<number>>
}
