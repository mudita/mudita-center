/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const privacyPolicyAcceptedMigration = (store: any) => {
  if (store.get("collectingData") !== undefined) {
    store.set("privacyPolicyAccepted", false)
  }
}
