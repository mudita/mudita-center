/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal from "./modal/modal"
import { TextModal } from "./modal/text-modal"
import TextInput from "./form/input/text-input"
import ProgressBar from "./progress-bar/progress-bar"
import Form from "./form/form"
import RadioInput from "./form/input/radio-input"
import CheckboxInput from "./form/input/checkbox-input"
import Tooltip from "./tooltip/tooltip"
import SearchInput from "./form/input/search-input"
import ModalButtons from "./modal/helpers/modal-buttons"
import ModalCloseButton from "./modal/helpers/modal-close-button"
import ModalSizeController from "./modal/helpers/modal-size-controller"
import ModalTitle from "./modal/helpers/modal-title"
import ModalTitleIcon from "./modal/helpers/modal-title-icon"
import ModalScrollableContent from "./modal/helpers/modal-scrollable-content"

export const interactive = {
  modal: Modal,
  "modal.titleIcon": ModalTitleIcon,
  "modal.title": ModalTitle,
  "modal.scrollableContent": ModalScrollableContent,
  "modal.buttons": ModalButtons,
  "modal.closeButton": ModalCloseButton,
  "modal.sizeController": ModalSizeController,
  "text-modal": TextModal,
  form: Form,
  "form.textInput": TextInput,
  "form.searchInput": SearchInput,
  "form.radioInput": RadioInput,
  "form.checkboxInput": CheckboxInput,
  "progress-bar": ProgressBar,
  tooltip: Tooltip,
  "tooltip.anchor": Tooltip.Anchor,
  "tooltip.content": Tooltip.Content,
}
