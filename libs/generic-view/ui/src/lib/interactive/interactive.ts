/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal from "./modal/modal"
import { TextModal } from "./modal/text-modal"
import TextInput from "./input/text-input"
import ProgressBar from "./progress-bar/progress-bar"
import Form from "./form/form"
import RadioInput from "./input/radio-input"
import CheckboxInput from "./input/checkbox-input"
import Tooltip from "./tooltip/tooltip"
import SearchInput from "./input/search-input"

export const interactive = {
  modal: Modal,
  "text-modal": TextModal,
  "text-input": TextInput,
  "search-input": SearchInput,
  "radio-input": RadioInput,
  "checkbox-input": CheckboxInput,
  "progress-bar": ProgressBar,
  form: Form,
  tooltip: Tooltip,
  "tooltip.anchor": Tooltip.Anchor,
  "tooltip.content": Tooltip.Content,
}
