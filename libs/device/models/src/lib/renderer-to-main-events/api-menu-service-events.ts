/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

<<<<<<<< HEAD:libs/device/models/src/lib/renderer-to-main-events/api-menu-service-events.ts
export enum APIMenuServiceEvents {
  GetMenuConfig = "apiservice_menu-get-config",
========
export enum IpcOutboxEvent {
  ReadOutboxEntries = "index_storage_read-outbox-entries",
>>>>>>>> develop:libs/core/outbox/constants/controller.constant.ts
}
