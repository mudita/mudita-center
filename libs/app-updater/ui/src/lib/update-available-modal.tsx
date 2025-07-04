/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Button, Checkbox, Modal, Typography } from "app-theme/ui"
import { ButtonTextModifier, ButtonType, IconType } from "app-theme/models"
import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useState,
} from "react"
import { defineMessages, formatMessage } from "app-localize/utils"
import { AppLegalPaths } from "app-routing/models"

const messages = defineMessages({
  title: {
    id: "general.appUpdate.availableModal.title",
  },
  policyDescription: {
    id: "general.appUpdate.availableModal.policy.description",
  },
  policyLinkText: {
    id: "general.appUpdate.availableModal.policy.checkbox.text",
  },
  policyLinkUrl: {
    id: "general.appUpdate.availableModal.policy.checkbox.link.text",
  },
  button: {
    id: "general.appUpdate.availableModal.buttonText",
  },
})

interface Props {
  opened: boolean
  version?: string
  onClose?: VoidFunction
  onUpdate?: VoidFunction
}

export const UpdateAvailableModal: FunctionComponent<Props> = ({
  opened,
  version,
  onClose,
  onUpdate,
}) => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setChecked(event.target.checked)
    }, [])

  return (
    <Modal opened={opened}>
      {onClose && <Modal.CloseButton onClick={onClose} />}
      <Modal.TitleIcon type={IconType.MuditaLogo} />
      <Modal.Title>{formatMessage(messages.title, { version })}</Modal.Title>
      <Typography.P1>{formatMessage(messages.policyDescription)}</Typography.P1>
      <Checkbox onChange={handleCheckboxChange}>
        {formatMessage(messages.policyLinkText)}{" "}
        <Button
          to={AppLegalPaths.PrivacyPolicy}
          target="appWindow"
          type={ButtonType.Text}
          modifiers={[
            ButtonTextModifier.Link,
            ButtonTextModifier.Inline,
            ButtonTextModifier.HoverUnderline,
          ]}
        >
          {formatMessage(messages.policyLinkUrl)}
        </Button>
      </Checkbox>
      <Modal.Buttons>
        <Button onClick={onUpdate} disabled={!checked}>
          {formatMessage(messages.button)}
        </Button>
      </Modal.Buttons>
    </Modal>
  )
}
