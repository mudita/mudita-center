/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { AppState } from "app-store/models"
import { useLayoutEffect } from "react"
import { MenuItem } from "app-routing/models"
import { checkMenuGroup } from "./app-menu.selectors"
import { registerMenuItems } from "./app-menu.actions"

export const useMenuItemsRegister = (groupIndex: number, items: MenuItem[]) => {
  const dispatch = useDispatch()
  const menuGroupExists = useSelector((state: AppState) =>
    checkMenuGroup(state, groupIndex)
  )

  useLayoutEffect(() => {
    if (menuGroupExists) {
      dispatch(
        registerMenuItems({
          groupIndex,
          items,
        })
      )
    }
  }, [dispatch, groupIndex, items, menuGroupExists])
}
