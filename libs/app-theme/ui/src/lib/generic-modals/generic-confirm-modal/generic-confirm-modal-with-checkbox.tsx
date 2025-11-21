/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useState,
} from "react"
import { formatMessage } from "app-localize/utils"
import { Checkbox } from "../../form/checkbox/checkbox"
import { GenericConfirmModalProps } from "./generic-confirm-modal.types"
import { GenericConfirmModalLayout } from "./generic-confirm-modal-layout"

export const GenericConfirmModalWithCheckbox: FunctionComponent<
  GenericConfirmModalProps
> = (props) => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setChecked(event.target.checked)
    }, [])

  return (
    <GenericConfirmModalLayout {...props} confirmDisabled={!checked}>
      <Checkbox onChange={handleCheckboxChange}>
        {props.messages.confirmModalCheckboxText &&
          formatMessage(props.messages.confirmModalCheckboxText)}
      </Checkbox>
    </GenericConfirmModalLayout>
  )
}
