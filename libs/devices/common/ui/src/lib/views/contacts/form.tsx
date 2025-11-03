/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { FormProvider, useForm } from "react-hook-form"

export interface FormValues {
  checkedContactsIds: (string | undefined)[]
  activeContactId?: string
  searchQuery: string
}

export const Form: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const form = useForm<FormValues>({
    defaultValues: {
      checkedContactsIds: [],
      activeContactId: undefined,
      searchQuery: "",
    },
  })

  return <FormProvider {...form}>{children}</FormProvider>
}
