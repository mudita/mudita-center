/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Modal from "./modal/modal"
import { TextModal } from "./modal/text-modal"
import { TextInput } from "./input/text-input"
import Form from "./form/form"

export const interactive = {
  modal: Modal,
  "text-modal": TextModal,
  "text-input": TextInput,
  form: Form,
}
