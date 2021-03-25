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
  logConfig = LogConfig.ReturnValue
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const targetMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      const valueOrPromise: Promise<any> | any = targetMethod.apply(this, args)

      Promise.resolve(valueOrPromise).then((value: any) => {
        logger.log(message)

        if (logConfig === LogConfig.ReturnValue) {
          logger.log(JSON.stringify(value, null, 2))
        } else {
          logger.log(JSON.stringify(args, null, 2))
        }
      })

      return valueOrPromise
    }

    return descriptor
  }
}
