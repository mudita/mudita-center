/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { InputText } from "Renderer/components/core/input-text/input-text.elements"
import { useForm } from "react-hook-form"
import { ContactSupportFieldValues } from "App/contact-support/components/contact-support-modal.component"
import {
  emailValidator,
  backupSecretKeyValidator,
} from "Renderer/utils/form-validators"
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
      const { queryByText } = render()
      expect(
        queryByText("[value] component.formErrorInvalidEmail")
      ).not.toBeInTheDocument()
    })
    test("should pass as valid when email value is corrected", () => {
      const { getByTestId, queryByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "mudita@center.com" },
      })
      expect(
        queryByText("[value] component.formErrorInvalidEmail")
      ).not.toBeInTheDocument()
    })
    test("should pass as invalid when the email is doubled", async () => {
      const { getByTestId, queryByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "mudita@center.com,mudita@center.com" },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] component.formErrorInvalidEmail")
        ).toBeInTheDocument()
      })
    })
  })

  describe("backupSecretKey Validator", () => {
    const defaultProps: Props = {
      validator: backupSecretKeyValidator,
    }
    const render = (extraProps?: Partial<Props>) => {
      const props = {
        ...defaultProps,
        ...extraProps,
      }
      return renderWithThemeAndIntl(<Form {...props} />)
    }
    test("should pass as valid when the input wasn't active", () => {
      const { queryByText } = render()
      expect(
        queryByText("[value] module.overview.backupSecretKeyValidation")
      ).not.toBeInTheDocument()
    })
    test("should pass as valid when password value is corrected", () => {
      const { getByTestId, queryByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "Abcdef1!" },
      })
      expect(
        queryByText("[value] module.overview.backupSecretKeyValidation")
      ).not.toBeInTheDocument()
    })
    test("should pass as invalid when the password doesn't contain any number", async () => {
      const { getByTestId, queryByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "Abcdefg!" },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] module.overview.backupSecretKeyValidation")
        ).toBeInTheDocument()
      })
    })
    test("should pass as invalid when the password doesn't contain any upper case", async () => {
      const { getByTestId, queryByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "abcdef1!" },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] module.overview.backupSecretKeyValidation")
        ).toBeInTheDocument()
      })
    })
    test("should pass as invalid when the password doesn't contain any special character", async () => {
      const { getByTestId, queryByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "Abcdefg1" },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] module.overview.backupSecretKeyValidation")
        ).toBeInTheDocument()
      })
    })
    test("should pass as invalid when the password doesn't contain any lower case", async () => {
      const { getByTestId, queryByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "ABCDEF1!" },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] module.overview.backupSecretKeyValidation")
        ).toBeInTheDocument()
      })
    })
    test("should pass as invalid when the password is shorter then 8 characters", async () => {
      const { getByTestId, queryByText } = render()
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "Ab1!" },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] module.overview.backupSecretKeyValidation")
        ).toBeInTheDocument()
      })
    })
  })
})
