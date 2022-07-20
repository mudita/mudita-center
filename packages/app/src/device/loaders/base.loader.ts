/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { LoaderClass } from "App/device/loaders/loader-class.interface"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"

export abstract class BaseLoader implements LoaderClass {
  isResponsesSuccessWithData(responses: RequestResponse<any>[]): boolean {
    return responses.every(
      ({ status, data }) =>
        status === RequestResponseStatus.Ok && data !== undefined
    )
  }

  getActiveNetworkFromSim(simCards: SimCard[] = []): string | undefined {
    const activeSimCard = simCards.filter((simCard) => simCard.active)
    if (activeSimCard.length === 0) {
      return "No connection"
    }
    return activeSimCard[0].network
  }

  getActiveNetworkLevelFromSim = (
    simCards: SimCard[] = []
  ): string | undefined => {
    const activeSimCard = simCards.filter((simCard) => simCard.active)
    if (activeSimCard.length === 0) {
      return "No connection"
    }
    return String(activeSimCard[0].networkLevel)
  }

  async load(): Promise<any> {
    console.log("Please implement load method")
  }
}
