/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { defineMessages, FormattedMessage } from "react-intl"
import { Typography } from "app-theme/ui"
import { TypographyAlign } from "app-theme/models"

const messages = defineMessages({
  optional: { id: "general.contactSupport.formModal.labelOptionalText" },
})

interface Props {
  label: {
    id: string
  }
  optional?: boolean
  className?: string
}

export const ContactSupportInputLabel: FunctionComponent<Props> = ({
  className,
  label,
  optional,
}) => (
  <Typography.P3 className={className} textAlign={TypographyAlign.Left}>
    <FormattedMessage {...label} />
    {optional && (
      <Typography.P3 color="grey3" as={"span"}>
        {" "}
        (<FormattedMessage {...messages.optional} />)
      </Typography.P3>
    )}
  </Typography.P3>
)
