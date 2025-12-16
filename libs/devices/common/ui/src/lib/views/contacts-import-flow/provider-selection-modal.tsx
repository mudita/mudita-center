/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Button, Modal, Typography } from "app-theme/ui"
import { ExternalAuthProvider } from "app-utils/models"
import { ButtonTextModifier, ButtonType, IconType } from "app-theme/models"
import { defineMessages } from "app-localize/utils"
import styled from "styled-components"

const messages = defineMessages({
  title: {
    id: "apiDevice.contacts.import.providerSelectionModal.title",
  },
  description: {
    id: "apiDevice.contacts.import.providerSelectionModal.description",
  },
  googleButton: {
    id: "apiDevice.contacts.import.providerSelectionModal.buttonGoogle",
  },
  outlookButton: {
    id: "apiDevice.contacts.import.providerSelectionModal.buttonOutlook",
  },
  fileButton: {
    id: "apiDevice.contacts.import.providerSelectionModal.buttonFile",
  },
  helpButton: {
    id: "apiDevice.contacts.import.providerSelectionModal.buttonHelp",
  },
})

export interface ProvidersSelectionModalProps {
  opened: boolean
  onClose: VoidFunction
  onProviderSelect: (provider: ExternalAuthProvider | "file") => void
  onHelpClick?: VoidFunction
}

export const ProviderSelectionModal: FunctionComponent<
  ProvidersSelectionModalProps
> = ({ opened, onClose, onProviderSelect, onHelpClick }) => {
  const handleGoogleClick = () => onProviderSelect(ExternalAuthProvider.Google)
  const handleOutlookClick = () =>
    onProviderSelect(ExternalAuthProvider.Outlook)
  const handleFileClick = () => onProviderSelect("file")

  return (
    <Modal opened={opened}>
      <Modal.CloseButton onClick={onClose} />
      <Modal.TitleIcon type={IconType.ContactsBook} />
      <Modal.Title message={messages.title.id} />
      <Typography.P1 message={messages.description.id} />
      <ButtonsWrapper>
        <Button
          message={messages.googleButton.id}
          type={ButtonType.Secondary}
          onClick={handleGoogleClick}
          icon={IconType.Google}
        />
        <Button
          message={messages.outlookButton.id}
          type={ButtonType.Secondary}
          onClick={handleOutlookClick}
          icon={IconType.Outlook}
        />
        <Button
          message={messages.fileButton.id}
          type={ButtonType.Secondary}
          onClick={handleFileClick}
          icon={IconType.Download}
        />
        {onHelpClick && (
          <Button
            type={ButtonType.Text}
            message={messages.helpButton.id}
            modifiers={[
              ButtonTextModifier.Link,
              ButtonTextModifier.DefaultCase,
              ButtonTextModifier.HoverUnderline,
            ]}
            onClick={onHelpClick}
          />
        )}
      </ButtonsWrapper>
    </Modal>
  )
}

const ButtonsWrapper = styled(Modal.DenseContent)`
  width: 22rem;
`
