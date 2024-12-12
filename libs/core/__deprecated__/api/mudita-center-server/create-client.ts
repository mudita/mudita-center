/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Client } from "Core/__deprecated__/api/mudita-center-server/client"

export const createClient = (timeout?: number, apiV2?: boolean): Client => new Client(timeout, apiV2)
