/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

export const noop = (...args: unknown[]): void => {
  // no operation here
}

export const asyncNoop = (...args: unknown[]): Promise<any> => {
  return new Promise<any>((resolve) => resolve(undefined))
}
