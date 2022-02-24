/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type Controller<Type = {}> = {
  [key in keyof Type]: (args?: any) => any
}
