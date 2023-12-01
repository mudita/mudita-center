/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  EndpointKompakt,
  MethodKompakt,
  ResponseStatus,
} from "App/device/constants"

export type HeaderKompakt = {
  endpoint: EndpointKompakt
  method: MethodKompakt
  offset: number
  limit: number
  uuid: number
  status: ResponseStatus
  contd: boolean
}
