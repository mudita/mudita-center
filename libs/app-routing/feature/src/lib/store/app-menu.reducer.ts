/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { unionBy } from "lodash"
import { registerMenuGroups, registerMenuItems } from "./app-menu.actions"
import { AppMenuReducer } from "app-routing/models"

const initialState: AppMenuReducer = {
  groups: [],
}

export const appMenuReducer = createReducer(initialState, (builder) => {
  builder.addCase(registerMenuGroups, (state, action) => {
    const groups = action.payload.map((group) => ({
      ...group,
      items: group.items || [],
    }))
    state.groups = unionBy(state.groups, groups, "index").sort((a, b) => {
      return a.index - b.index
    })
  })
  builder.addCase(registerMenuItems, (state, action) => {
    const { items, groupIndex } = action.payload
    const group = state.groups.find(({ index }) => index === groupIndex)
    if (!group) return

    group.items = unionBy(group.items, items, "path").sort((a, b) => {
      return (a.index || 0) - (b.index || 0)
    })
  })
})
