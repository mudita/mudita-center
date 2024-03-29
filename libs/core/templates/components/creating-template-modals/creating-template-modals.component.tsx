/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { CreatingTemplateModalsProps } from "Core/templates/components/creating-template-modals/creating-template-modals.interface"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import InfoPopup from "Core/ui/components/info-popup/info-popup.component"
import ErrorModal from "Core/ui/components/error-modal/error-modal.component"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { CreatingTemplateModalsTestIds } from "Core/templates/components/creating-template-modals/creating-template-modals-test-ids.enum"

const messages = defineMessages({
  templateCreated: { id: "module.templates.templateCreated" },
  creatingModalTitle: { id: "module.templates.creatingModalTitle" },
  creatingModalSubtitle: { id: "module.templates.creatingModalSubtitle" },
  creatingModalErrorTitle: { id: "module.templates.creatingModalErrorTitle" },
  creatingModalErrorSubtitle: {
    id: "module.templates.creatingModalErrorSubtitle",
  },
})

export const CreatingTemplateModals: FunctionComponent<
  CreatingTemplateModalsProps
> = ({ error, creating, creatingInfo, onCloseCreatingErrorModal }) => {
  return (
    <>
      {/* TODO: connect to global notification state */}
      {creatingInfo && (
        <InfoPopup
          testId={CreatingTemplateModalsTestIds.CreatedPopUp}
          message={messages.templateCreated}
        />
      )}
      {creating && !error && (
        <LoaderModal
          testId={CreatingTemplateModalsTestIds.LoadingModal}
          open={creating}
          title={intl.formatMessage(messages.creatingModalTitle)}
          subtitle={intl.formatMessage(messages.creatingModalSubtitle)}
        />
      )}
      {creating && error !== null && (
        <ErrorModal
          testId={CreatingTemplateModalsTestIds.ErrorModal}
          open={creating && error !== null}
          title={intl.formatMessage(messages.creatingModalErrorTitle)}
          subtitle={intl.formatMessage(messages.creatingModalErrorSubtitle)}
          closeModal={onCloseCreatingErrorModal}
        />
      )}
    </>
  )
}
