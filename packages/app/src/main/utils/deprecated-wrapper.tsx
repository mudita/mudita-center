/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"

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
