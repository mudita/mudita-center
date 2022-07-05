/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { OrderingTemplateModalsProps } from "App/templates/components/ordering-template-modals"
import { defineMessages } from "react-intl"
import InfoPopup from "App/ui/components/info-popup/info-popup.component"
import { OrderingTemplateModalsTestIds } from "App/templates/components/ordering-template-modals/ordering-template-modals-test-ids.enum"

const messages = defineMessages({
  templateOrderUpdated: { id: "module.templates.orderUpdated" },
  templateOrderError: { id: "module.templates.orderError" },
})

export const OrderingTemplateModals: FunctionComponent<
  OrderingTemplateModalsProps
> = ({ updating, updated, error }) => {
  return (
    <>
      {error && updating && (
        <InfoPopup
          testId={OrderingTemplateModalsTestIds.Error}
          message={messages.templateOrderError}
        />
      )}
      {updated && (
        <InfoPopup
          testId={OrderingTemplateModalsTestIds.OrderUpdated}
          message={messages.templateOrderUpdated}
        />
      )}
    </>
  )
}
