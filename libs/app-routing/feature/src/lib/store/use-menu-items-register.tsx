/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { AppState } from "app-store/models"
import { useLayoutEffect } from "react"
import { MenuIndex, MenuItem } from "app-routing/models"
import { checkMenuGroup } from "./app-menu.selectors"
import { registerMenuItems } from "./app-menu.actions"

export const useMenuItemsRegister = (groupIndex: MenuIndex, items: MenuItem[]) => {
  const dispatch = useDispatch()
  const menuGroupExists = useSelector((state: AppState) =>
    checkMenuGroup(state, groupIndex)
  )
  const itemsDependency = JSON.stringify(items)

  useLayoutEffect(() => {
    if (menuGroupExists) {
      dispatch(
        registerMenuItems({
          groupIndex,
          items,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, groupIndex, itemsDependency, menuGroupExists])
}
