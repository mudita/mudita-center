/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TemplatesProps } from "App/templates/components/templates/templates.interface"
import { TemplatesSection } from "App/templates/components/templates/templates.styled"
import { TemplatesPanel } from "App/templates/components/templates-panel"
import { TemplatesList } from "App/templates/components/templates-list"
import { TemplateForm } from "App/templates/components/template-form"
import { NewTemplate } from "App/templates/dto"
import { TemplateError } from "App/templates/constants"

export const Templates: FunctionComponent<TemplatesProps> = ({
  templates,
  loading,
  error,
  createTemplate,
  deleteTemplates,
}) => {
  const [newTemplateOpen, setNewTemplateOpenState] = useState<boolean>(false)

  const handleOpenNewTemplateForm = () => {
    setNewTemplateOpenState(true)
  }
  const handleCloseNewTemplateForm = () => {
    setNewTemplateOpenState(false)
  }

  const handleSaveTemplate = async (template: NewTemplate) => {
    const data = await createTemplate(template)

    if (data.payload.type !== TemplateError.CreateTemplate) {
      setNewTemplateOpenState(false)
    }
  }

  return (
    <>
      <TemplatesPanel
        disabled={newTemplateOpen}
        onAddNewTemplate={handleOpenNewTemplateForm}
      />
      <TemplatesSection>
        <TemplatesList
          templates={templates}
          deleteTemplates={deleteTemplates}
        />
        {newTemplateOpen && (
          <TemplateForm
            saving={loading}
            savingPossible={newTemplateOpen}
            error={error}
            onSave={handleSaveTemplate}
            onClose={handleCloseNewTemplateForm}
          />
        )}
      </TemplatesSection>
    </>
  )
}
