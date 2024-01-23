/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

<<<<<<<< HEAD:libs/device/models/src/lib/renderer-to-main-events/api-outbox-service-events.ts
export enum APIOutboxServiceEvents {
  GetOutboxData = "apiservice_outbox-get-data",
========
export enum IpcIndexStorageEvent {
  LoadIndex = "index_storage_load-index",
  SaveIndex = "index_storage_save-index",
>>>>>>>> develop:libs/core/index-storage/constants/controller.constant.ts
}
