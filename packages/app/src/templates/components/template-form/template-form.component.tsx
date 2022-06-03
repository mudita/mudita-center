/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type,
} from "Renderer/components/core/button/button.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import { TemplateFormProps } from "App/templates/components/template-form/template-form.interface"
import {
  Content,
  TemplateDetailsWrapper,
  Buttons,
  Form,
  TextArea,
} from "App/templates/components/template-form/template-form.styled"
import { TemplateFormTestIds } from "App/templates/components/template-form/template-form-ids.enum"
import { byteLengthValidator } from "App/templates/components/template-form/byte-length.validator"

const messages = defineMessages({
  editTitle: { id: "module.templates.editTitle" },
  newTitle: { id: "module.templates.newTitle" },
  text: { id: "module.templates.text" },
  cancel: { id: "module.templates.cancelButton" },
  save: { id: "module.templates.saveButton" },
})

export const TemplateForm: FunctionComponent<TemplateFormProps> = ({
  onClose,
  onSave,
  error,
  template,
  savingPossible = true,
  saving = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: template
      ? template
      : {
          text: "",
        },
    mode: "onChange",
  })

  useEffect(() => {
    if (error) {
      setError("text", {
        type: "manual",
        message: error?.toString(),
      })
    }
  }, [error])

  const HeaderLeft = (
    <Text
      displayStyle={TextDisplayStyle.Headline4}
      message={template?.id ? messages.editTitle : messages.newTitle}
    />
  )

  const handleSave = handleSubmit((data) => {
    onSave(data)
  })

  return (
    <TemplateDetailsWrapper
      show
      onClose={onClose}
      headerLeft={HeaderLeft}
      data-testid={TemplateFormTestIds.Container}
    >
      <Form onSubmit={handleSave}>
        <Content>
          <TextArea
            {...register("text", byteLengthValidator())}
            data-testid={TemplateFormTestIds.TextFiled}
            type="textarea"
            defaultHeight="100%"
            errorMessage={errors.text?.message}
            label={intl.formatMessage(messages.text)}
            autoFocus
          />
        </Content>

        <Buttons>
          <ButtonComponent
            displayStyle={DisplayStyle.Secondary}
            labelMessage={messages.cancel}
            onClick={onClose}
            data-testid={TemplateFormTestIds.CancelButton}
          />
          <ButtonComponent
            type={Type.Submit}
            data-testid={TemplateFormTestIds.SaveButton}
            disabled={
              !savingPossible || Object.keys(errors).length > 0 || saving
            }
            label={
              saving ? (
                <Loader
                  data-testid={TemplateFormTestIds.Spinner}
                  size={2}
                  type={LoaderType.Spinner}
                />
              ) : (
                intl.formatMessage(messages.save)
              )
            }
          />
        </Buttons>
      </Form>
    </TemplateDetailsWrapper>
  )
}
