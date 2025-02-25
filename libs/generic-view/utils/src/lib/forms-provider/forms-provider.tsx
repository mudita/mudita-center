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
  clear: (formKey: string) => void
}

const FormsContext = createContext<FormsContextValue>({
  registerForm: () => {},
  getFormContext: () => undefined,
  clear: () => {},
})

export const FormsProvider: FunctionComponent = ({ children }) => {
  const forms = useRef<Record<string, UseFormReturn>>({})

  const registerForm = useCallback((formKey: string, form: UseFormReturn) => {
    if (!(formKey in forms.current)) {
      forms.current[formKey] = form
    }
  }, [])

  const getFormContext = useCallback((formKey?: string) => {
    if (!formKey) {
      throw new Error(`Form key is required`)
    }
    return forms.current[formKey]
  }, [])

  const clear = useCallback((formKey: string) => {
    delete forms.current[formKey]
  }, [])

  useEffect(() => {
    return () => {
      forms.current = {}
    }
  }, [])

  return (
    <FormsContext.Provider value={{ registerForm, getFormContext, clear }}>
      {children}
    </FormsContext.Provider>
  )
}

export const useViewFormRegister = (formKey: string, form: UseFormReturn) => {
  const { registerForm, clear } = useContext(FormsContext)
  registerForm(formKey, form)
  return () => clear(formKey)
}

export const useViewFormContext = () => {
  const defaultFormContext = useFormContext()
  const formsContext = useContext(FormsContext)

  return (formKey?: string) => {
    return (
      formKey ? formsContext.getFormContext(formKey) : defaultFormContext
    ) as UseFormReturn
  }
}

export type UseViewFormContext = ReturnType<typeof useViewFormContext>
