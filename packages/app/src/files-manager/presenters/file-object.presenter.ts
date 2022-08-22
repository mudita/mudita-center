/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FileInput, File } from "App/files-manager/dto"

export class FileObjectPresenter {
  static toFile(item: FileInput): File {
    const name = item.path.split("/").reverse()[0]
    const type = name.split(".").reverse()[0]

    return {
      name,
      type,
      id: item.path,
      size: item.fileSize,
    }
  }
}
