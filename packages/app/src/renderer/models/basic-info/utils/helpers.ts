/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

export const getActiveNetworkFromSim = (simCards: SimCard[] = []) => {
  const activeSimCard = simCards.filter((simCard) => simCard.active)
  if (activeSimCard.length === 0) {
    return "No connection"
  }
  return activeSimCard[0].network
}
export const getActiveNetworkLevelFromSim = (simCards: SimCard[] = []) => {
  const activeSimCard = simCards.filter((simCard) => simCard.active)
  if (activeSimCard.length === 0) {
    return "No connection"
  }
  return activeSimCard[0].networkLevel
}
