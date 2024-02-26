/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
} from "react"
import { FormProvider as HookFormProvider, useForm } from "react-hook-form"

interface FormContextProps {
  fields: FormField[]
  setField: (field: FormField) => void
}

export const FormContext = createContext<FormContextProps>({
  fields: [],
  setField: () => {},
})

interface FormField {
  name: string
  value?: string | number
}

export const FormProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const methods = useForm()

  return <HookFormProvider {...methods}>{children}</HookFormProvider>
}
