/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LoggerFactory } from "./logger-factory"

export enum LogConfig {
  Args,
  ReturnValue,
}

const logger = LoggerFactory.getInstance()

export default function log(
  message: string,
  logConfig = LogConfig.ReturnValue,
) {
  return function(
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const targetMethod = descriptor.value
    descriptor.value = function(...args: unknown[]) {
      const valueOrPromise: Promise<unknown> | unknown = targetMethod.apply(this, args)

      const logValue = (value: unknown) => {
        logger.info(message)

        if (logConfig === LogConfig.ReturnValue) {
          logger.info(JSON.stringify(value, null, 2))
        } else {
          logger.info(JSON.stringify(args, null, 2))
        }
      }

      void Promise.resolve(valueOrPromise).then(logValue, logValue)

      return valueOrPromise
    }

    return descriptor
  }
}
