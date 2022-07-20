/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const noop = (...args: unknown[]): any => {
  // no operation here
}

export const asyncNoop = (...args: unknown[]): Promise<any> => {
  return new Promise<any>((resolve) => resolve(undefined))
}
