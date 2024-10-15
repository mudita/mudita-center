/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC, useViewFormRegister } from "generic-view/utils"
import { FormProvider, useForm } from "react-hook-form"
import { TextInput } from "./input/text-input"
import { RadioInput } from "./input/radio-input"
import { CheckboxInput } from "./input/checkbox-input"
import { SearchInput } from "./input/search-input"
import { FormConfig } from "generic-view/models"
import { FormConditionalRenderer } from "./helpers/form-conditional-renderer"
import { useFormRegister } from "generic-view/store"

export const Form: APIFC<undefined, FormConfig> & {
  TextInput: typeof TextInput
  RadioInput: typeof RadioInput
  CheckboxInput: typeof CheckboxInput
  SearchInput: typeof SearchInput
  ConditionalRenderer: typeof FormConditionalRenderer
} = ({ config, children, componentKey }) => {
  const methods = useForm({
    mode: "onTouched",
    ...config?.formOptions,
  })
  useViewFormRegister(componentKey!, methods)
  useFormRegister({
    formName: componentKey!,
    options: {
      defaultFields: config?.defaultFields,
    },
  })
  return <FormProvider {...methods}>{children}</FormProvider>
}
Form.TextInput = TextInput
Form.RadioInput = RadioInput
Form.CheckboxInput = CheckboxInput
Form.SearchInput = SearchInput
Form.ConditionalRenderer = FormConditionalRenderer

export default Form
