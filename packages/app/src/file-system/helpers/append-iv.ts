/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Transform, TransformCallback } from "stream"
import { BinaryLike } from "crypto"

export class AppendIv extends Transform {
  iv: BinaryLike
  appended = false

  constructor(iv: BinaryLike) {
    super()
    this.iv = iv
  }

  _transform(chunk: any, _: BufferEncoding, callback: TransformCallback): void {
    if (!this.appended) {
      this.push(this.iv)
      this.appended = true
    }
    this.push(chunk)
    callback()
  }
}
