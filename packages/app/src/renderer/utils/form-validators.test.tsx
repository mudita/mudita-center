/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl} from "Renderer/utils/render-with-theme-and-intl"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import { useForm } from "react-hook-form"
import { ContactSupportFieldValues } from "Renderer/components/rest/contact-support-modal/contact-support-modal.component"
import { emailValidator } from "Renderer/utils/form-validators"
import { noop } from "Renderer/utils/noop"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { RegisterOptions } from "react-hook-form/dist/types"
import { fireEvent } from "@testing-library/react"
import { waitFor } from "@testing-library/dom"

enum FormTestIds {
  Input = "form-input",
}

interface Props {
  validator: RegisterOptions
}

const Form: FunctionComponent<Props> = ({ validator }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSupportFieldValues>({
    mode: "onChange",
  })

  return (
    <form onSubmit={handleSubmit(noop)}>
      <InputText
        type={"text"}
        data-testid={FormTestIds.Input}
        errorMessage={errors.validator?.message}
        {...register("validator", validator)}
      />
    </form>
  )
}

describe("Form Validators", () => {
  describe("Email Validator", () => {
    const defaultProps: Props = {
      validator: emailValidator,
    }
    const render = (extraProps?: Partial<Props>) => {
      const props = {
        ...defaultProps,
        ...extraProps,
      }
      return renderWithThemeAndIntl(<Form {...props} />)
    }
    test("should pass as valid when is the input wasn't active", () => {
      const { queryAllByText } = render()
      expect(queryAllByText("[value] component.formErrorInvalidEmail")).toHaveLength(0)
    })
    test("should pass as valid when email value is corrected", () => {
      const { getByTestId, queryAllByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "mudita@center.com" },
      })
      expect(queryAllByText("[value] component.formErrorInvalidEmail")).toHaveLength(0)
    })
    test("should pass as invalid when the email is doubled",  async() => {
      const { getByTestId, queryAllByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "mudita@center.com,mudita@center.com" },
      })
      await waitFor(() => {
        expect(queryAllByText("[value] component.formErrorInvalidEmail")).toHaveLength(1)
      })
    })
  })
})
