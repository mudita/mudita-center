/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import { UseFormProps } from "react-hook-form/dist/types/form"
import { FormProvider, useForm } from "react-hook-form"
import { withConfig } from "../../utils/with-config"

interface Config {
  formOptions?: Pick<UseFormProps, "mode" | "reValidateMode" | "defaultValues">
}

export const Form: APIFC<undefined, Config> = ({ config, children }) => {
  const methods = useForm({
    mode: "onTouched",
    ...config?.formOptions,
  })
  return <FormProvider {...methods}>{children}</FormProvider>
}

export default withConfig(Form)
