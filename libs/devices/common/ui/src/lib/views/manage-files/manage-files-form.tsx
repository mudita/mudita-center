/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren } from "react"
import { FormProvider, useForm } from "react-hook-form"

export interface ManageFilesFormValues {
  selectedFiles: Record<string, boolean>
}

export const ManageFilesForm: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const form = useForm<ManageFilesFormValues>({
    defaultValues: {
      selectedFiles: {},
    },
  })

  return <FormProvider {...form}>{children}</FormProvider>
}
