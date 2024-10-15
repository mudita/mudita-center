/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

interface Animation {
  duration: number
  easing: string
}

export const animation: Record<string, Animation> = {
  toast: {
    duration: 300,
    easing: "ease-in-out",
  },
} as const
