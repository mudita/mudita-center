/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import { UseFormProps } from "react-hook-form/dist/types/form"
import { FormProvider, useForm } from "react-hook-form"
import { withConfig } from "../../utils/with-config"
import { TextInput } from "./input/text-input"
import { RadioInput } from "./input/radio-input"
import { CheckboxInput } from "./input/checkbox-input"
import { SearchInput } from "./input/search-input"

interface Config {
  formOptions?: Pick<UseFormProps, "mode" | "reValidateMode" | "defaultValues">
}

export const Form: APIFC<undefined, Config> & {
  TextInput: typeof TextInput
  RadioInput: typeof RadioInput
  CheckboxInput: typeof CheckboxInput
  SearchInput: typeof SearchInput
} = ({ config, children }) => {
  const methods = useForm({
    mode: "onTouched",
    ...config?.formOptions,
  })
  return <FormProvider {...methods}>{children}</FormProvider>
}
Form.TextInput = TextInput
Form.RadioInput = RadioInput
Form.CheckboxInput = CheckboxInput
Form.SearchInput = SearchInput

export default withConfig(Form)
