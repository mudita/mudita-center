/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal from "./modal/modal"
import { TextModal } from "./modal/text-modal"
import { ProgressBar } from "./progress-bar/progress-bar"
import Form from "./form/form"
import Tooltip from "./tooltip/tooltip"
import { Toast } from "./toast/toast"
import { ConditionalRenderer } from "./conditional-renderer"
import {
  accordion,
  conditionalRenderer,
  form,
  formatMessage,
  formCheckboxInput,
  formRadioInput,
  formSearchInput,
  formSearchInputResults,
  formTextInput,
  modal,
  modalButtons,
  modalCloseButton,
  modalScrollableContent,
  modalSizeController,
  modalTitle,
  modalTitleIcon,
  modalVisibilityController,
  progressBar,
  textModal,
  toast,
  tooltip,
  tooltipAnchor,
  tooltipContent,
} from "generic-view/models"
import { FormatMessage } from "./format-message"
import { Accordion } from "./accordion/accordion"

export const interactive = {
  [modal.key]: Modal,
  [modalTitleIcon.key]: Modal.TitleIcon,
  [modalTitle.key]: Modal.Title,
  [modalScrollableContent.key]: Modal.ScrollableContent,
  [modalButtons.key]: Modal.Buttons,
  [modalCloseButton.key]: Modal.CloseButton,
  [modalSizeController.key]: Modal.SizeController,
  [modalVisibilityController.key]: Modal.VisibilityController,
  [textModal.key]: TextModal,
  [form.key]: Form,
  [formTextInput.key]: Form.TextInput,
  [formSearchInput.key]: Form.SearchInput,
  [formSearchInputResults.key]: Form.SearchInputResults,
  [formRadioInput.key]: Form.RadioInput,
  [formCheckboxInput.key]: Form.CheckboxInput,
  [progressBar.key]: ProgressBar,
  [tooltip.key]: Tooltip,
  [tooltipAnchor.key]: Tooltip.Anchor,
  [tooltipContent.key]: Tooltip.Content,
  [formatMessage.key]: FormatMessage,
  [toast.key]: Toast,
  [conditionalRenderer.key]: ConditionalRenderer,
  [accordion.key]: Accordion,
}
