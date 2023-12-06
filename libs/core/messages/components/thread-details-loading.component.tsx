/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ThreadDetailsTestIds } from "Core/messages/components/thread-details-test-ids.enum"
import { FunctionComponent } from "Core/__deprecated__/renderer/types/function-component.interface"
import { Content } from "Core/messages/components/thread-details.styled"
import Loader from "Core/__deprecated__/renderer/components/core/loader/loader.component"
import { LoaderType } from "Core/__deprecated__/renderer/components/core/loader/loader.interface"

const ThreadDetailsLoading: FunctionComponent = () => {
  return (
    <Content>
      <Loader
        size={4}
        type={LoaderType.Spinner}
        data-testid={ThreadDetailsTestIds.Loader}
      />
    </Content>
  )
}

export default ThreadDetailsLoading
