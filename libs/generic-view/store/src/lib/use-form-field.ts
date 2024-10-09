/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveApiDeviceId } from "./selectors/select-active-api-device-id"
import { selectViewForm } from "./selectors"
import { setFormField } from "./views/actions"
import { get } from "lodash"
import { useCallback } from "react"
import { useCurrentViewKey } from "generic-view/utils"

interface UseViewForm {
  formName?: string
}

export const useFormField = ({ formName }: UseViewForm) => {
  const viewKey = useCurrentViewKey()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)
  const form = useSelector((state: ReduxRootState) => {
    if (!formName) return undefined
    return selectViewForm(state, { formName, viewKey })
  })

  const getField = useCallback(
    (field: string) => {
      return field && form?.fields ? get(form.fields, field) : undefined
    },
    [form?.fields]
  )

  const setField = useCallback(
    (field: string, value: unknown) => {
      if (!activeDeviceId || !field || !formName || !form) return
      if (getField(field) === value) return
      dispatch(
        setFormField({
          field,
          value,
          deviceId: activeDeviceId,
          feature: viewKey,
          formName,
        })
      )
    },
    [activeDeviceId, dispatch, form, formName, getField, viewKey]
  )

  const resetField = useCallback(
    (field: string) => {
      if (!activeDeviceId || !field || !formName || !form) return
      const value = get(form.defaultValues, field)
      dispatch(
        setFormField({
          field,
          value,
          deviceId: activeDeviceId,
          feature: viewKey,
          formName,
        })
      )
    },
    [activeDeviceId, dispatch, form, formName, viewKey]
  )

  return {
    getField,
    setField,
    resetField,
  }
}
