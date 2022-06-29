/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as dotenv from "dotenv"
import { CleanUpFactory } from "../cleanup"

dotenv.config()

new CleanUpFactory().create().cleanUpDevice()
