/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum DomainTransferStatus {
  Idle = "IDLE",
  Ready = "READY",
  InProgress = "IN-PROGRESS",
  Processing = "PROCESSING",
  Finished = "FINISHED",
}

export type DataTransferStatus =
  | "IDLE"
  | "IN-PROGRESS"
  | "FINALIZING"
  | "FAILED"

type Domain = string

export type DataTransfer = Record<
  Domain,
  {
    status: DomainTransferStatus
  }
>
