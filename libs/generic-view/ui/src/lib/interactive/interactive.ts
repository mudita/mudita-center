/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal from "./modal/modal"
import { TextModal } from "./modal/text-modal"
import { ProgressBar } from "./progress-bar/progress-bar"
import Form from "./form/form"
import Tooltip from "./tooltip/tooltip"
import {
  form,
  formCheckboxInput,
  formRadioInput,
  formSearchInput,
  formTextInput,
  modal,
  modalButtons,
  modalCloseButton,
  modalScrollableContent,
  modalSizeController,
  modalTitle,
  modalTitleIcon,
  progressBar,
  textModal,
  tooltip,
  tooltipAnchor,
  tooltipContent,
} from "generic-view/models"

export const interactive = {
  [modal.key]: Modal,
  [modalTitleIcon.key]: Modal.TitleIcon,
  [modalTitle.key]: Modal.Title,
  [modalScrollableContent.key]: Modal.ScrollableContent,
  [modalButtons.key]: Modal.Buttons,
  [modalCloseButton.key]: Modal.CloseButton,
  [modalSizeController.key]: Modal.SizeController,
  [textModal.key]: TextModal,
  [form.key]: Form,
  [formTextInput.key]: Form.TextInput,
  [formSearchInput.key]: Form.SearchInput,
  [formRadioInput.key]: Form.RadioInput,
  [formCheckboxInput.key]: Form.CheckboxInput,
  [progressBar.key]: ProgressBar,
  [tooltip.key]: Tooltip,
  [tooltipAnchor.key]: Tooltip.Anchor,
  [tooltipContent.key]: Tooltip.Content,
}
