/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveApiDeviceId } from "generic-view/store"
import { Fields, registerForm, selectForm } from "forms/store"
import { useEffect } from "react"

interface Params {
  formName: string
  options?: {
    appForm?: boolean
    defaultFields?: Fields
  }
}

export const useFormRegister = ({ formName, options }: Params) => {
  const dispatch = useDispatch<Dispatch>()

  const isAppForm = options?.appForm
  const activeDeviceId = useSelector(selectActiveApiDeviceId)
  const form = useSelector((state: ReduxRootState) => {
    if (!isAppForm && !activeDeviceId) return undefined
    return selectForm(state, {
      formName,
      deviceId: isAppForm ? undefined : activeDeviceId,
    })
  })

  useEffect(() => {
    if (!activeDeviceId || form) return
    const { defaultFields = {} } = options || {}
    dispatch(
      registerForm({
        deviceId: isAppForm ? undefined : activeDeviceId,
        formName,
        form: {
          fields: defaultFields,
          defaultFields,
        },
      })
    )
  }, [activeDeviceId, isAppForm, dispatch, form, formName, options])
}
