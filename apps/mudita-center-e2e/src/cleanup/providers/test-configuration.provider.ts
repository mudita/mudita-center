/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import config from "../../../configrc.json"
import { Config } from "../types"
import { TestConfigurationProviderClass } from "./test-configuration-provider.class"

export class TestConfigurationProvider
  implements TestConfigurationProviderClass
{
  public config: Config = config
}
