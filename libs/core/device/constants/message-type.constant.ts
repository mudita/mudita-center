/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum MessageType {
  DRAFT = 1,
  FAILED = 2,
  INBOX = 4,
  OUTBOX = 8,
  QUEUED = 16,
  INPUT = 18,
  UNKNOWN = 255,
}
