/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveApiDeviceId } from "./selectors/select-active-api-device-id"
import { registerForm } from "./views/actions"
import { useEffect } from "react"
import { selectViewForm } from "./selectors"
import { useCurrentViewKey } from "generic-view/utils"

interface UseViewForm {
  formName: string
  options?: {
    defaultValues?: Record<string, unknown>
  }
}

export const useFormRegister = ({ formName, options }: UseViewForm) => {
  const viewKey = useCurrentViewKey()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)
  const form = useSelector((state: ReduxRootState) => {
    return selectViewForm(state, { formName, viewKey })
  })

  useEffect(() => {
    if (!activeDeviceId || form) return
    const { defaultValues = {} } = options || {}
    dispatch(
      registerForm({
        deviceId: activeDeviceId,
        feature: viewKey,
        formName,
        form: {
          fields: defaultValues,
          defaultValues,
        },
      })
    )
  }, [activeDeviceId, dispatch, form, formName, options, viewKey])
}
