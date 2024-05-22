/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { LoggerFactory } from "Core/core/factories"

export enum LogConfig {
  Args,
  ReturnValue,
}

interface LogOptions {
  logConfig?: LogConfig
  space?: number
}

const resolveLogOptions = (options?: LogOptions | LogConfig): LogOptions => {
  const defaultOptions: LogOptions = { logConfig: LogConfig.ReturnValue, space: 2 };

  if (typeof options === "number") {
    return { ...defaultOptions, logConfig: options };
  }

  return { ...defaultOptions, ...options };
}

const logger = LoggerFactory.getInstance()

export function log(message: string, options?: LogOptions | LogConfig) {
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const { logConfig, space } = resolveLogOptions(options)

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
          if (
            Object.prototype.hasOwnProperty.call(value, "data") &&
            Object.prototype.hasOwnProperty.call(value, "ok")
          ) {
            logger.info(
              JSON.stringify(
                [(value as ResultObject<unknown>).data],
                null,
                space
              )
            )
          } else {
            logger.info(JSON.stringify([value], null, space))
          }
        } else {
          logger.info(JSON.stringify(args, null, space))
        }
      })

      return valueOrPromise
    }

    return descriptor
  }
}
