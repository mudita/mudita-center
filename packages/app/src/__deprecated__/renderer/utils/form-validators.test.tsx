/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { waitFor } from "@testing-library/dom"
import { fireEvent } from "@testing-library/react"
import { ContactSupportFieldValues } from "App/contact-support/components/contact-support-modal.component"
import { InputText } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import {
  addressValidator,
  backupSecretKeyValidator,
  emailValidator,
  nameValidator,
} from "App/__deprecated__/renderer/utils/form-validators"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import React from "react"
import { useForm } from "react-hook-form"
import { RegisterOptions } from "react-hook-form/dist/types"

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
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        errorMessage={errors.validator?.message}
        {...register("validator", validator)}
      />
    </form>
  )
}

const render = (props: Props) => {
  return renderWithThemeAndIntl(<Form {...props} />)
}

describe("Form Validators", () => {
  describe("Email Validator", () => {
    const defaultProps: Props = {
      validator: emailValidator,
    }
    test("should pass as valid when is the input wasn't active", () => {
      const { queryByText } = render(defaultProps)
      expect(
        queryByText("[value] component.formErrorInvalidEmail")
      ).not.toBeInTheDocument()
    })
    test("should pass as valid when email value is corrected", () => {
      const { getByTestId, queryByText } = render(defaultProps)
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "mudita@center.com" },
      })
      expect(
        queryByText("[value] component.formErrorInvalidEmail")
      ).not.toBeInTheDocument()
    })
    test("should pass as invalid when the email is doubled", async () => {
      const { getByTestId, queryByText } = render(defaultProps)
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
    test("should pass as valid when the input wasn't active", () => {
      const { queryByText } = render(defaultProps)
      expect(
        queryByText("[value] module.overview.backupSecretKeyValidation")
      ).not.toBeInTheDocument()
    })
    test("should pass as valid when password value is corrected", () => {
      const { getByTestId, queryByText } = render(defaultProps)
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "Abcdef1!" },
      })
      expect(
        queryByText("[value] module.overview.backupSecretKeyValidation")
      ).not.toBeInTheDocument()
    })
    test("should pass as invalid when the password doesn't contain any number", async () => {
      const { getByTestId, queryByText } = render(defaultProps)
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
      const { getByTestId, queryByText } = render(defaultProps)
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
      const { getByTestId, queryByText } = render(defaultProps)
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
      const { getByTestId, queryByText } = render(defaultProps)
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
      const { getByTestId, queryByText } = render(defaultProps)
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: { value: "Ab1!" },
      })
      await waitFor(() => {
        expect(
          queryByText("[value] module.overview.backupSecretKeyValidation")
        ).toBeInTheDocument()
      })
    })
    describe("should pass as valid when password value contains at least one of special character &'()*+,-./:;<=>?@[]^_`{|}~ ", () => {
      test.each([
        "&",
        "'",
        "(",
        ")",
        "*",
        "+",
        "-",
        ".",
        "/",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "@",
        "[",
        "]",
        "^",
        "_",
        "`",
        "{",
        "|",
        "}",
        "~",
        " ",
      ])(
        "should pass as valid when password value contains %s",
        (specialCharacter) => {
          const { getByTestId, queryByText } = render(defaultProps)
          fireEvent.change(getByTestId(FormTestIds.Input), {
            target: { value: "Abcdef1" + specialCharacter },
          })
          expect(
            queryByText("[value] module.overview.backupSecretKeyValidation")
          ).not.toBeInTheDocument()
        }
      )
    })
  })

  describe("name validator", () => {
    const defaultProps: Props = {
      validator: nameValidator,
    }
    test("should pass as valid when the input wasn't active", () => {
      const { queryByText } = render(defaultProps)
      expect(
        queryByText("[value] component.formErrorTooLong")
      ).not.toBeInTheDocument()
    })

    test("should show error when name is longer than 32 characters", async () => {
      const { getByTestId, queryByText } = render(defaultProps)
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: {
          value: "1234 1234 1234 1234 1234 1234 1234 ",
        },
      })

      await waitFor(() => {
        expect(
          queryByText("[value] component.formErrorTooLong")
        ).toBeInTheDocument()
      })
    })
    test("should not display error when name is shorter than 32 characters", () => {
      const { getByTestId, queryByText } = render(defaultProps)
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: {
          value: "1234 ",
        },
      })

      expect(
        queryByText("[value] component.formErrorTooLong")
      ).not.toBeInTheDocument()
    })
  })

  describe("address validator", () => {
    const defaultProps: Props = {
      validator: addressValidator,
    }

    test("should pass as valid when the input wasn't active", () => {
      const { queryByText } = render(defaultProps)
      expect(
        queryByText("[value] component.formErrorTooLong")
      ).not.toBeInTheDocument()
    })

    test("should show error when address is longer than 30 characters", async () => {
      const { getByTestId, queryByText } = render(defaultProps)
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: {
          value: "1234 1234 1234 1234 1234 1234 1234 ",
        },
      })

      await waitFor(() => {
        expect(
          queryByText("[value] component.formErrorTooLong")
        ).toBeInTheDocument()
      })
    })
    test("should not display error when address is shorter than 30 characters", () => {
      const { getByTestId, queryByText } = render(defaultProps)
      fireEvent.change(getByTestId(FormTestIds.Input), {
        target: {
          value: "1234 ",
        },
      })

      expect(
        queryByText("[value] component.formErrorTooLong")
      ).not.toBeInTheDocument()
    })
  })
})
