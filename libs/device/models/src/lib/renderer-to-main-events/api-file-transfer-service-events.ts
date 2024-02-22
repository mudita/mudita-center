/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ApiFileTransferServiceEvents {
  PreGet = "apiservice_file_transfer-pre-transfer-get",
  Get = "apiservice_file_transfer-transfer-get",
  PreSend = "apiservice_file_transfer-pre-transfer-send",
  Send = "apiservice_file_transfer-transfer-send",
  Clear = "apiservice_file_transfer-transfer-clear",
}
