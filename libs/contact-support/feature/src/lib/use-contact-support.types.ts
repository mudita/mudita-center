/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppError } from "app-utils/models"

export enum SupportMetaErrorName {
  MkdirError = "mkdirError",
  AggregateAppLogsError = "aggregateAppLogsError",
  DownloadLogsError = "downloadLogsError",
  ArchiveError = "archiveError",
}

export type MetaCreateTicketError = AppError<SupportMetaErrorName>
