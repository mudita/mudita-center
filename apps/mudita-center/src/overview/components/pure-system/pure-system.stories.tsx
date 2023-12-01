/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { storiesOf } from "@storybook/react"
import React from "react"
import PureSystem from "App/overview/components/pure-system/pure-system.component"

storiesOf("Views|Overview/PureSystem", module).add("PureSystem", () => {
  return <PureSystem serialNumber={"247"} />
})
