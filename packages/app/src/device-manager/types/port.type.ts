/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo as SerialPortInfo } from "serialport"

export type PortInfo = Omit<SerialPortInfo, "path">
