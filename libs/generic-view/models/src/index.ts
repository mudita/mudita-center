/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { blockBox } from "./lib/block-box"
import { blockPlain } from "./lib/block-plain"
import { blockHeading } from "./lib/block-heading"
import { buttonText } from "./lib/button-text"
import { buttonPrimary } from "./lib/button-primary"
import { buttonSecondary } from "./lib/button-secondary"
import { iconText } from "./lib/icon-text"
import { badge } from "./lib/badge"
import { labeledText } from "./lib/labeled-text"
import { textFormatted } from "./lib/text-formatted"
import { textPlain } from "./lib/text-plain"
import { image } from "./lib/image"
import { modalTitleIcon } from "./lib/modal-title-icon"
import { icon } from "./lib/icon"
import { modal } from "./lib/modal"
import { divider } from "./lib/divider"
import { modalTitle } from "./lib/modal-title"
import { modalScrollableContent } from "./lib/modal-scrollable-content"
import { modalButtons } from "./lib/modal-buttons"
import { modalCloseButton } from "./lib/modal-close-button"
import { textModal } from "./lib/text-modal"
import { form } from "./lib/form"
import { modalSizeController } from "./lib/modal-size-controller"
import { modalVisibilityController } from "./lib/modal-visibility-controller"
import { formTextInput } from "./lib/form-text-input"
import { formSearchInput } from "./lib/form-search-input"
import { formRadioInput } from "./lib/form-radio-input"
import { formCheckboxInput } from "./lib/form-checkbox-input"
import { tooltip } from "./lib/tooltip"
import { progressBar } from "./lib/progress-bar"
import { tooltipAnchor } from "./lib/tooltip-anchor"
import { overviewOsVersion } from "./lib/overview-os-version"
import { tooltipContent } from "./lib/tooltip-content"
import { aboutDataBox } from "./lib/about-data-box"
import { h3Component } from "./lib/headers"
import { P1Component } from "./lib/paragraphs"
import { lastBackupDate } from "./lib/last-backup-date"
import { backupCreate } from "./lib/backup-create"
import { importContacts } from "./lib/import-contacts"
import { backupRestore } from "./lib/backup-restore"
import { backupRestoreAvailable } from "./lib/backup-restore-available"
import { mcImportContactsButton } from "./lib/mc-import-contacts-button"
import { mcDataMigration } from "./lib/mc-data-migration"

export * from "./lib/block-box"
export * from "./lib/block-plain"
export * from "./lib/block-heading"
export * from "./lib/button-text"
export * from "./lib/button-primary"
export * from "./lib/button-secondary"
export * from "./lib/icon-text"
export * from "./lib/badge"
export * from "./lib/image"
export * from "./lib/labeled-text"
export * from "./lib/text-formatted"
export * from "./lib/text-plain"
export * from "./lib/divider"
export * from "./lib/icon"
export * from "./lib/modal"
export * from "./lib/modal-title-icon"
export * from "./lib/modal-title"
export * from "./lib/modal-scrollable-content"
export * from "./lib/modal-buttons"
export * from "./lib/modal-close-button"
export * from "./lib/modal-size-controller"
export * from "./lib/text-modal"
export * from "./lib/form"
export * from "./lib/form-text-input"
export * from "./lib/form-radio-input"
export * from "./lib/form-search-input"
export * from "./lib/form-checkbox-input"
export * from "./lib/progress-bar"
export * from "./lib/tooltip"
export * from "./lib/tooltip-anchor"
export * from "./lib/tooltip-content"
export * from "./lib/headers"
export * from "./lib/paragraphs"
export * from "./lib/overview-os-version"
export * from "./lib/about-data-box"
export * from "./lib/last-backup-date"
export * from "./lib/backup-restore-available"
export * from "./lib/backup-create"
export * from "./lib/backup-restore"
export * from "./lib/import-contacts"
export * from "./lib/mc-import-contacts-button"
export * from "./lib/modal-visibility-controller"
export * from "./lib/mc-data-migration"

export default {
  [blockBox.key]: blockBox,
  [blockPlain.key]: blockPlain,
  [blockHeading.key]: blockHeading,
  [buttonText.key]: buttonText,
  [buttonPrimary.key]: buttonPrimary,
  [buttonSecondary.key]: buttonSecondary,
  [iconText.key]: iconText,
  [badge.key]: badge,
  [image.key]: image,
  [labeledText.key]: labeledText,
  [textFormatted.key]: textFormatted,
  [textPlain.key]: textPlain,
  [divider.key]: divider,
  [icon.key]: icon,
  [modal.key]: modal,
  [modalTitleIcon.key]: modalTitleIcon,
  [modalTitle.key]: modalTitle,
  [modalScrollableContent.key]: modalScrollableContent,
  [modalButtons.key]: modalButtons,
  [modalCloseButton.key]: modalCloseButton,
  [modalSizeController.key]: modalSizeController,
  [modalVisibilityController.key]: modalVisibilityController,
  [textModal.key]: textModal,
  [form.key]: form,
  [formTextInput.key]: formTextInput,
  [formRadioInput.key]: formRadioInput,
  [formSearchInput.key]: formSearchInput,
  [formCheckboxInput.key]: formCheckboxInput,
  [progressBar.key]: progressBar,
  [tooltip.key]: tooltip,
  [tooltipAnchor.key]: tooltipAnchor,
  [tooltipContent.key]: tooltipContent,
  [h3Component.key]: h3Component,
  [P1Component.key]: P1Component,
  [overviewOsVersion.key]: overviewOsVersion,
  [aboutDataBox.key]: aboutDataBox,
  [lastBackupDate.key]: lastBackupDate,
  [backupRestoreAvailable.key]: backupRestoreAvailable,
  [backupCreate.key]: backupCreate,
  [backupRestore.key]: backupRestore,
  [importContacts.key]: importContacts,
  [mcImportContactsButton.key]: mcImportContactsButton,
  [mcDataMigration.key]: mcDataMigration,
} as const
