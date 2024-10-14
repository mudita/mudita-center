/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { BaseGenericComponent, useViewFormRegister } from "generic-view/utils"
import { FormProvider, useForm } from "react-hook-form"
import { TextInput } from "./input/text-input"
import { RadioInput } from "./input/radio-input"
import { CheckboxInput } from "./input/checkbox-input"
import { SearchInput } from "./input/search-input"
import { FormConfig } from "generic-view/models"
import { FormConditionalRenderer } from "./helpers/form-conditional-renderer"
import { useFormRegister } from "forms/feature"

export const Form: BaseGenericComponent<
  undefined,
  FormConfig,
  {
    viewKey?: string
    componentKey?: string
    dataItemId?: string
    appForm?: boolean
  }
> & {
  TextInput: typeof TextInput
  RadioInput: typeof RadioInput
  CheckboxInput: typeof CheckboxInput
  SearchInput: typeof SearchInput
  ConditionalRenderer: typeof FormConditionalRenderer
} = ({ config, children, componentKey, appForm }) => {
  const methods = useForm({
    mode: "onTouched",
    ...config?.formOptions,
  })
  useViewFormRegister(componentKey!, methods)
  useFormRegister({
    formName: componentKey!,
    appForm,
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
