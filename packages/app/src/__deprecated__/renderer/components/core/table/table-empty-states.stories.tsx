/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import {
  EmptyState,
  LoadingState,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import { fullPageStoryStyles } from "App/__deprecated__/renderer/components/core/table/table-shared.stories"

export default {
  title: "Components|Core/Table/Empty states",
}

export const LoadingView = () => (
  <Story customStyle={fullPageStoryStyles} transparentMode>
    <LoadingState />
  </Story>
)

LoadingView.story = {
  name: "Loading view",
}

export const EmptyView = () => (
  <Story customStyle={fullPageStoryStyles} transparentMode>
    <EmptyState
      title={{ id: "module.contacts.emptyListTitle" }}
      description={{
        id: "module.contacts.emptyPhonebook",
      }}
    />
  </Story>
)

EmptyView.story = {
  name: "Empty view",
}
