/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { UseFormReturn } from "react-hook-form/dist/types"
import { useFormContext } from "react-hook-form"

interface FormsContextValue {
  registerForm: (formKey: string, form: UseFormReturn) => void
  getFormContext: (formKey?: string) => UseFormReturn | undefined
}

const FormsContext = createContext<FormsContextValue>({
  registerForm: () => {},
  getFormContext: () => undefined,
})

export const FormsProvider: FunctionComponent = ({ children }) => {
  const formContext = useFormContext()
  const forms = useRef<Record<string, UseFormReturn>>({})

  const registerForm = useCallback((formKey: string, form: UseFormReturn) => {
    if (!(formKey in forms.current)) {
      forms.current[formKey] = form
    }
  }, [])

  const getFormContext = useCallback((formKey?: string) => {
    if (formKey) {
      const form = forms.current[formKey]
      if (!form) {
        throw new Error(`Form with key ${formKey} not found`)
      }
      return form
    }
    return formContext
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      forms.current = {}
    }
  }, [])

  return (
    <FormsContext.Provider value={{ registerForm, getFormContext }}>
      {children}
    </FormsContext.Provider>
  )
}

export const useViewFormRegister = (formKey: string, form: UseFormReturn) => {
  const { registerForm } = useContext(FormsContext)
  registerForm(formKey, form)
}

export const useViewFormContext = () => {
  const defaultFormContext = useFormContext()
  const formsContext = useContext(FormsContext)

  return useCallback(
    (formKey?: string) => {
      const formContext = formsContext.getFormContext(formKey)
      return formContext ?? defaultFormContext
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
