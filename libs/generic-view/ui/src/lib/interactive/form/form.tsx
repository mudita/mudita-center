/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { APIFC, useViewFormRegister } from "generic-view/utils"
import { FormProvider, useForm } from "react-hook-form"
import { TextInput } from "./input/text-input"
import { RadioInput } from "./input/radio-input"
import { CheckboxInput } from "./input/checkbox-input"
import { SearchInput } from "./input/search-input"
import { SearchResults } from "./input/search-results"
import { FormConfig } from "generic-view/models"
import { SelectInput } from "./input/select-input"

export const Form: APIFC<undefined, FormConfig> & {
  TextInput: typeof TextInput
  RadioInput: typeof RadioInput
  CheckboxInput: typeof CheckboxInput
  SearchInput: typeof SearchInput
  SearchInputResults: typeof SearchResults
  SelectInput: typeof SelectInput
} = ({ config, children, componentKey }) => {
  const methods = useForm({
    mode: "onTouched",
    ...config?.formOptions,
  })
  const clear = useViewFormRegister(componentKey!, methods)

  useEffect(() => {
    return () => {
      clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <FormProvider {...methods}>{children}</FormProvider>
}
Form.TextInput = TextInput
Form.RadioInput = RadioInput
Form.CheckboxInput = CheckboxInput
Form.SearchInput = SearchInput
Form.SearchInputResults = SearchResults
Form.SelectInput = SelectInput

export default Form
