/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useDispatch, useSelector, useStore } from "react-redux"
import { Dispatch, ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveApiDeviceId } from "./selectors/select-active-api-device-id"
import { selectViewForm } from "./selectors"
import { setFormField } from "./views/actions"
import { get } from "lodash"
import { useCallback, useMemo } from "react"
import { useCurrentViewKey } from "generic-view/utils"

interface SetOptions {
  customFormName?: string
}

interface GetOptions extends SetOptions {
  fromDefault?: boolean
}

interface UseViewForm {
  formName?: string
}

export const useFormField = ({ formName }: UseViewForm = {}) => {
  const viewKey = useCurrentViewKey()
  const dispatch = useDispatch<Dispatch>()
  const activeDeviceId = useSelector(selectActiveApiDeviceId)!
  const store = useStore<ReduxRootState>()
  const form = useSelector((state: ReduxRootState) => {
    if (!formName) return undefined
    return selectViewForm(state, { formName, viewKey })
  })

  const viewForms = useMemo(() => {
    return store.getState().genericViews.devices[activeDeviceId].features?.[
      viewKey
    ]?.forms
  }, [activeDeviceId, store, viewKey])

  const getField = useCallback(
    <T = string>(
      field: string,
      { customFormName, fromDefault }: GetOptions = {}
    ) => {
      const targetFormName = customFormName || formName
      if (!targetFormName || !field) return undefined

      const source = form || viewForms?.[targetFormName]
      const fields = fromDefault ? source?.defaultFields : source?.fields
      return get(fields, field) as T
    },
    [form, formName, viewForms]
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
          deviceId: activeDeviceId,
          feature: viewKey,
          formName: targetFormName,
        })
      )
    },
    [activeDeviceId, dispatch, formName, getField, viewKey]
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
          deviceId: activeDeviceId,
          feature: viewKey,
          formName: targetFormName,
        })
      )
    },
    [activeDeviceId, dispatch, formName, getField, viewKey]
  )

  return {
    getField,
    setField,
    resetField,
  }
}
