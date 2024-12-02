/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo as SerialPortInfo } from "@serialport/bindings-interface"

export * from "./node_modules/serialport/dist/index"
export type PortInfo = Pick<SerialPortInfo, "path"> &
  Partial<Omit<SerialPortInfo, "path">>
