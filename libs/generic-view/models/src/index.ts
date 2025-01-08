/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { blockBox } from "./lib/block-box"
import { blockPlain } from "./lib/block-plain"
import { blockHeading } from "./lib/block-heading"
import { buttonIcon } from "./lib/button-icon"
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
import { formSearchInputResults } from "./lib/form-search-input-results"
import { formRadioInput } from "./lib/form-radio-input"
import { formCheckboxInput } from "./lib/form-checkbox-input"
import { tooltip } from "./lib/tooltip"
import { progressBar } from "./lib/progress-bar"
import { segmentBar } from "./lib/segment-bar"
import { tooltipAnchor } from "./lib/tooltip-anchor"
import { overviewOsVersion } from "./lib/overview-os-version"
import { tooltipContent } from "./lib/tooltip-content"
import { aboutDataBox } from "./lib/about-data-box"
import { h3Component, h4Component, h5Component } from "./lib/headers"
import { p3Component, p4Component, p5Component } from "./lib/paragraphs"
import { lastBackupDate } from "./lib/last-backup-date"
import { listItem } from "./lib/list-item"
import { marker } from "./lib/marker"
import { backupCreate } from "./lib/backup-create"
import { importContacts } from "./lib/import-contacts"
import { backupRestore } from "./lib/backup-restore"
import { backupRestoreAvailable } from "./lib/backup-restore-available"
import { mcImportContactsButton } from "./lib/mc-import-contacts-button"
import { mcContactsView } from "./lib/mc-contacts-view"
import { mcDataMigration } from "./lib/mc-data-migration"
import { mcFileManagerView } from "./lib/mc-file-manager-view"
import { incomingFeatureInfo } from "./lib/incoming-feature-info"
import { table } from "./lib/table"
import { tableCell, tableHeaderCell } from "./lib/table-cell"
import { entitiesLoader } from "./lib/entities-loader"
import { conditionalRenderer } from "./lib/conditional-renderer"
import { toast } from "./lib/toast"
import { selectionManager } from "./lib/selection-manager"
import { formatMessage } from "./lib/format-message"
import { appPortal } from "./lib/app-portal"
import { buttonPlain } from "./lib/button-plain"
import { highlightText } from "./lib/highlight-text"
import { mcContactsSearchResults } from "./lib/mc-contacts-search-results"
import { TypographyMap } from "./lib/typography"

export * from "./lib/block-box"
export * from "./lib/block-plain"
export * from "./lib/block-heading"
export * from "./lib/button-icon"
export * from "./lib/button-text"
export * from "./lib/button-primary"
export * from "./lib/button-secondary"
export * from "./lib/button-plain"
export * from "./lib/icon-text"
export * from "./lib/badge"
export * from "./lib/image"
export * from "./lib/labeled-text"
export * from "./lib/text-formatted"
export * from "./lib/text-plain"
export * from "./lib/device"
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
export * from "./lib/form-search-input-results"
export * from "./lib/form-checkbox-input"
export * from "./lib/progress-bar"
export * from "./lib/segment-bar"
export * from "./lib/tooltip"
export * from "./lib/tooltip-anchor"
export * from "./lib/tooltip-content"
export * from "./lib/headers"
export * from "./lib/paragraphs"
export * from "./lib/common-text-validators"
export * from "./lib/overview-os-version"
export * from "./lib/about-data-box"
export * from "./lib/last-backup-date"
export * from "./lib/list-item"
export * from "./lib/marker"
export * from "./lib/backup-restore-available"
export * from "./lib/backup-create"
export * from "./lib/backup-restore"
export * from "./lib/import-contacts"
export * from "./lib/mc-import-contacts-button"
export * from "./lib/mc-contacts-view"
export * from "./lib/modal-visibility-controller"
export * from "./lib/mc-data-migration"
export * from "./lib/mc-file-manager-view"
export * from "./lib/incoming-feature-info"
export * from "./lib/table"
export * from "./lib/table-cell"
export * from "./lib/entities-loader"
export * from "./lib/common-validators"
export * from "./lib/conditional-renderer"
export * from "./lib/format-message"
export * from "./lib/toast"
export * from "./lib/selection-manager"
export * from "./lib/app-portal"
export * from "./lib/highlight-text"
export * from "./lib/mc-contacts-search-results"
export * from "./lib/typography"

export default {
  [blockBox.key]: blockBox,
  [blockPlain.key]: blockPlain,
  [blockHeading.key]: blockHeading,
  [buttonIcon.key]: buttonIcon,
  [buttonText.key]: buttonText,
  [buttonPrimary.key]: buttonPrimary,
  [buttonSecondary.key]: buttonSecondary,
  [buttonPlain.key]: buttonPlain,
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
  [formSearchInputResults.key]: formSearchInputResults,
  [formCheckboxInput.key]: formCheckboxInput,
  [progressBar.key]: progressBar,
  [segmentBar.key]: segmentBar,
  [tooltip.key]: tooltip,
  [tooltipAnchor.key]: tooltipAnchor,
  [tooltipContent.key]: tooltipContent,
  [h3Component.key]: h3Component,
  [h4Component.key]: h4Component,
  [h5Component.key]: h5Component,
  [p3Component.key]: p3Component,
  [p4Component.key]: p4Component,
  [p5Component.key]: p5Component,
  [overviewOsVersion.key]: overviewOsVersion,
  [aboutDataBox.key]: aboutDataBox,
  [lastBackupDate.key]: lastBackupDate,
  [listItem.key]: listItem,
  [marker.key]: marker,
  [backupRestoreAvailable.key]: backupRestoreAvailable,
  [backupCreate.key]: backupCreate,
  [backupRestore.key]: backupRestore,
  [importContacts.key]: importContacts,
  [mcImportContactsButton.key]: mcImportContactsButton,
  [mcContactsView.key]: mcContactsView,
  [mcDataMigration.key]: mcDataMigration,
  [mcFileManagerView.key]: mcFileManagerView,
  [incomingFeatureInfo.key]: incomingFeatureInfo,
  [table.key]: table,
  [tableCell.key]: tableCell,
  [tableHeaderCell.key]: tableHeaderCell,
  [entitiesLoader.key]: entitiesLoader,
  [conditionalRenderer.key]: conditionalRenderer,
  [formatMessage.key]: formatMessage,
  [toast.key]: toast,
  [selectionManager.key]: selectionManager,
  [appPortal.key]: appPortal,
  [highlightText.key]: highlightText,
  [mcContactsSearchResults.key]: mcContactsSearchResults,
  ...TypographyMap,
} as const
