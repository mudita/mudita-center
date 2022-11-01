/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LoggerFactory } from "./logger-factory.js"

export enum LogConfig {
  Args,
  ReturnValue,
}

const logger = LoggerFactory.getInstance()

export default function log(
  message: string,
  logConfig = LogConfig.ReturnValue
) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const targetMethod = descriptor.value
    descriptor.value = function (...args: unknown[]) {
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const valueOrPromise: Promise<unknown> | unknown = targetMethod.apply(
        this,
        args
      )

      void Promise.resolve(valueOrPromise).then((value: unknown) => {
        logger.info(message)

        if (logConfig === LogConfig.ReturnValue) {
          logger.info(JSON.stringify([value], null, 2))
        } else {
          logger.info(JSON.stringify(args, null, 2))
        }
      })

      return valueOrPromise
    }

    return descriptor
  }
}
