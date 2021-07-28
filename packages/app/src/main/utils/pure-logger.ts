/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ConsoleLogger } from "@mudita/pure"
import logger from "App/main/utils/logger"

export interface ScrubProps {
  body?: unknown
  endpoint: number
  status: number
  uuid: number
}

const scrub = (message: string): string => {
  try {
    const messageParsed = JSON.parse(message) as ScrubProps[]
    if (messageParsed[0].body) {
      return JSON.stringify(
        [{ ...messageParsed[0], body: "scrubbed" }],
        null,
        2
      )
    } else {
      return message
    }
  } catch {
    return message
  }
}

class PureLogger implements ConsoleLogger {
  scrubbed = process.env.LOGS_SCRUBBED !== "false"

  info(message: string): void {
    if (this.scrubbed) {
      logger.info(scrub(message))
    } else {
      logger.info(message)
    }
  }
}

export default PureLogger
