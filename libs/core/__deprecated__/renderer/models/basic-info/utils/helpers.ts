/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SimCard } from "Core/__deprecated__/renderer/models/basic-info/basic-info.typings"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getActiveNetworkFromSim = (simCards: SimCard[] = []) => {
  const activeSimCard = simCards.filter((simCard) => simCard.active)
  if (activeSimCard.length === 0) {
    return "No connection"
  }
  return activeSimCard[0].network
}
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getActiveNetworkLevelFromSim = (simCards: SimCard[] = []) => {
  const activeSimCard = simCards.filter((simCard) => simCard.active)
  if (activeSimCard.length === 0) {
    return "No connection"
  }
  return activeSimCard[0].networkLevel
}
