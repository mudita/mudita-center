/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { CreatingTemplateModalsProps } from "App/templates/components/creating-template-modals/creating-template-modals.interface"
import { defineMessages } from "react-intl"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import ErrorModal from "App/ui/components/error-modal/error-modal.component"
import LoaderModal from "App/ui/components/loader-modal/loader-modal.component"
import { CreatingTemplateModalsTestIds } from "App/templates/components/creating-template-modals/creating-template-modals-test-ids.enum"

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
