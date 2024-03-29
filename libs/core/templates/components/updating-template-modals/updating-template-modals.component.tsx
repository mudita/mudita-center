/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { UpdatingTemplateModalsProps } from "Core/templates/components/updating-template-modals/updating-template-modals.interface"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import InfoPopup from "Core/ui/components/info-popup/info-popup.component"
import ErrorModal from "Core/ui/components/error-modal/error-modal.component"
import LoaderModal from "Core/ui/components/loader-modal/loader-modal.component"
import { UpdatingTemplateModalsTestIds } from "Core/templates/components/updating-template-modals/updating-template-modals-test-ids.enum"

const messages = defineMessages({
  templateUpdated: { id: "module.templates.templateUpdated" },
  updatingModalTitle: { id: "module.templates.updatingModalTitle" },
  updatingModalSubtitle: { id: "module.templates.updatingModalSubtitle" },
  updatingModalErrorTitle: { id: "module.templates.updatingModalErrorTitle" },
  updatingModalErrorSubtitle: {
    id: "module.templates.updatingModalErrorSubtitle",
  },
})

export const UpdatingTemplateModals: FunctionComponent<
  UpdatingTemplateModalsProps
> = ({ error, updating, updatingInfo, onCloseUpdatingErrorModal }) => {
  return (
    <>
      {/* TODO: connect to global notification state */}
      {updatingInfo && (
        <InfoPopup
          testId={UpdatingTemplateModalsTestIds.UpdatedPopUp}
          message={messages.templateUpdated}
        />
      )}
      {updating && !error && (
        <LoaderModal
          testId={UpdatingTemplateModalsTestIds.LoadingModal}
          open={updating}
          title={intl.formatMessage(messages.updatingModalTitle)}
          subtitle={intl.formatMessage(messages.updatingModalSubtitle)}
        />
      )}
      {updating && error !== null && (
        <ErrorModal
          testId={UpdatingTemplateModalsTestIds.ErrorModal}
          open={updating && error !== null}
          title={intl.formatMessage(messages.updatingModalErrorTitle)}
          subtitle={intl.formatMessage(messages.updatingModalErrorSubtitle)}
          closeModal={onCloseUpdatingErrorModal}
        />
      )}
    </>
  )
}
