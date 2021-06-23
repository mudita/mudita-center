/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LoggerFactory } from "./logger-factory"

export enum LogConfig {
  Args,
  ReturnValue,
}

interface ScrubProps {
  body?: unknown
  endpoint: number
  status: number
  uuid: number
}

const logger = LoggerFactory.getInstance()
const scrub = (resp: ScrubProps[]) => {
  const scrubbed = resp.map((item) => {
    if (item.body) {
      return { ...item, body: "scrubbed" }
    } else {
      return item
    }
  })
  return scrubbed
}
export default function log(
  message: string,
  logConfig = LogConfig.ReturnValue
) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const targetMethod = descriptor.value
    descriptor.value = function (...args: ScrubProps[]) {
      const valueOrPromise: Promise<unknown> | unknown = targetMethod.apply(
        this,
        args
      )

      void Promise.resolve(valueOrPromise).then((value: unknown) => {
        logger.info(message)

        if (logConfig === LogConfig.ReturnValue) {
          logger.info(JSON.stringify(value, null, 2))
        } else {
          logger.info(JSON.stringify(scrub(args), null, 2))
        }
      })

      return valueOrPromise
    }

    return descriptor
  }
}
