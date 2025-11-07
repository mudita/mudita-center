/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { FormProvider, useForm } from "react-hook-form"

export interface FormValues {
  selectedFiles: Record<string, boolean>
  activeFileId?: string
}

export const Form: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      selectedFiles: {},
      activeFileId: undefined,
    },
  })

  return <FormProvider {...form}>{children}</FormProvider>
}
