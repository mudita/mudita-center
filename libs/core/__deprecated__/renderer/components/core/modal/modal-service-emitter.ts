/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"

export enum ModelEvent {
  Close = "modal/close"
}

export const modalEventEmitter = new EventEmitter()
