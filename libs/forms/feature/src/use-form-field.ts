/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector, useStore } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { get } from "lodash"
import { useCallback, useMemo } from "react"
import { selectActiveApiDeviceId } from "generic-view/store"
import { resetForm, selectForm, setFormField } from "forms/store"

interface SetOptions {
  customFormName?: string
}

interface GetOptions extends SetOptions {
  fromDefault?: boolean
}

interface UseFormField {
  formName?: string
  appForm?: boolean
}

export const useFormField = ({ formName, appForm }: UseFormField = {}) => {
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)
  const store = useStore<ReduxRootState>()
  const form = useSelector((state: ReduxRootState) => {
    if (!formName) return undefined
    return selectForm(state, {
      formName,
      deviceId: appForm ? undefined : activeDeviceId,
    })
  })

  const forms = useMemo(() => {
    const source = appForm ? "app" : activeDeviceId
    if (!source) return undefined
    return store.getState().forms[source]
  }, [activeDeviceId, appForm, store])

  const getField = useCallback(
    <T = string>(
      field: string,
      { customFormName, fromDefault }: GetOptions = {}
    ) => {
      const targetFormName = customFormName || formName
      if (!targetFormName || !field) return undefined

      const source = form || forms?.[targetFormName]
      if (!source) return
      const fields = fromDefault ? source.defaultFields : source.fields
      return get(fields, field) as T | undefined
    },
    [form, formName, forms]
  )

  const setField = useCallback(
    (field: string, value: unknown, { customFormName }: SetOptions = {}) => {
      const targetFormName = customFormName || formName
      if (!targetFormName || !field) return
      if (getField(field, { customFormName }) === value) return
      dispatch(
        setFormField({
          field,
          value,
          deviceId: appForm ? undefined : activeDeviceId,
          formName: targetFormName,
        })
      )
    },
    [activeDeviceId, appForm, dispatch, formName, getField]
  )

  const resetField = useCallback(
    (field: string, { customFormName }: SetOptions = {}) => {
      const targetFormName = customFormName || formName
      if (!targetFormName || !field) return

      const value = getField(field, { customFormName, fromDefault: true })
      dispatch(
        setFormField({
          field,
          value,
          deviceId: appForm ? undefined : activeDeviceId,
          formName: targetFormName,
        })
      )
    },
    [activeDeviceId, appForm, dispatch, formName, getField]
  )

  const resetAllFields = useCallback(
    (customFormName?: string, appForm?: boolean) => {
      const targetFormName = customFormName || formName
      if (!targetFormName) return
      dispatch(
        resetForm({
          formName: targetFormName,
          deviceId: appForm ? undefined : activeDeviceId,
        })
      )
    },
    [activeDeviceId, dispatch, formName]
  )

  return {
    getField,
    setField,
    resetField,
    resetForm: resetAllFields,
  }
}
