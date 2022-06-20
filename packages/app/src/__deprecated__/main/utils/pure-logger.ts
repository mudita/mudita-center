/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ConsoleLogger } from "@mudita/pure"
import logger from "App/__deprecated__/main/utils/logger"
import { flags, Feature } from "App/feature-flags"

export interface ScrubProps {
  body?: any
  endpoint: number
  status: number
  uuid: number
}

class PureLogger implements ConsoleLogger {
  info(message: string): void {
    if (flags.get(Feature.LogsScrubbingEnabled)) {
      logger.info(this.scrub(message))
    } else {
      logger.info(this.scrubFileSystemData(message))
    }
  }

  private scrub(message: string): string {
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

  private scrubFileSystemData(message: string): string {
    try {
      const messageParsed = JSON.parse(message) as ScrubProps[]
      if (
        messageParsed[0].body &&
        messageParsed[0].endpoint === 3 &&
        Boolean(messageParsed[0].body?.data)
      ) {
        return JSON.stringify(
          [
            {
              ...messageParsed[0],
              body: { ...messageParsed[0].body, data: "scrubbed" },
            },
          ],
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
}

export default PureLogger
