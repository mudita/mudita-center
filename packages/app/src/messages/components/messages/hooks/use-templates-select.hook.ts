/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Template } from "App/templates/dto"
import { useState } from "react"

interface Props {
  setContent: (content: string) => void
}

interface UseTemplatesSelectHook {
  isModalOpened: boolean
  openAttachTemplateModal: () => void
  closeAttachTemplateModal: () => void
  selectTemplate: (template: Template) => void
}

export const useTemplatesSelect = ({
  setContent,
}: Props): UseTemplatesSelectHook => {
  const [isModalOpened, setIsModalOpened] = useState(false)

  const openAttachTemplateModal = () => {
    setIsModalOpened(true)
  }

  const closeAttachTemplateModal = () => {
    setIsModalOpened(false)
  }

  const selectTemplate = (template: Template) => {
    setContent(template.text)
    closeAttachTemplateModal()
  }

  return {
    isModalOpened,
    openAttachTemplateModal,
    closeAttachTemplateModal,
    selectTemplate,
  }
}
