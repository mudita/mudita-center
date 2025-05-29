/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */
import { RemotePathsTarget } from "./manage-test-files.const"

export const parseTargetArg = (
  args: string[],
  fallback: RemotePathsTarget = RemotePathsTarget.internal
): RemotePathsTarget => {
  const targetArg = args.find((arg) => arg.startsWith("--target="))
  const rawValue = targetArg?.split("=")[1]

  const isValid = Object.values(RemotePathsTarget).includes(
    rawValue as RemotePathsTarget
  )

  if (isValid) {
    return rawValue as RemotePathsTarget
  }

  if (rawValue) {
    console.warn(
      `⚠️ Unknown target "${rawValue}", falling back to "${fallback}".`
    )
  }

  return fallback
}
