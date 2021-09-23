/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

export const getActiveNetworkLevelFromSim = (
  simCards: SimCard[] = []
): string | undefined => {
  const activeSimCard = simCards.filter((simCard) => simCard.active)
  if (activeSimCard.length === 0) {
    return "No connection"
  }
  return String(activeSimCard[0].networkLevel)
}
