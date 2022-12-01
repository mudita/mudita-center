/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Element = FunctionComponent<any>

const deprecated = (component: Element, message?: string): Element => {
  if (process.env.NODE_ENV === "development") {
    const basicMessage = `This component is deprecated.`
    if (message) {
      console.warn(`${basicMessage} ${message}`)
    } else {
      console.warn(basicMessage)
    }
  }

  return component
}

export default deprecated
