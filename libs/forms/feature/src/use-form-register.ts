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
  appForm?: boolean
  options?: {
    defaultFields?: Fields
  }
}

export const useFormRegister = ({ formName, appForm, options }: Params) => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)
  const form = useSelector((state: ReduxRootState) => {
    if(!appForm && !activeDeviceId) return undefined
    return selectForm(state, {
      formName,
      deviceId: appForm ? undefined : activeDeviceId,
    })
  })

  useEffect(() => {
    if (!activeDeviceId || form) return
    const { defaultFields = {} } = options || {}
    dispatch(
      registerForm({
        deviceId: appForm ? undefined : activeDeviceId,
        formName,
        form: {
          fields: defaultFields,
        },
      })
    )
  }, [activeDeviceId, appForm, dispatch, form, formName, options])
}
