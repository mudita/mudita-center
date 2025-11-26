/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ChangeEventHandler,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react"
import { formatMessage } from "app-localize/utils"
import { Checkbox } from "../../form/checkbox/checkbox"
import { Typography } from "../../typography/typography"
import { GenericConfirmModalProps } from "./generic-confirm-modal.types"
import { GenericConfirmModalLayout } from "./generic-confirm-modal-layout"

export const GenericConfirmModalWithCheckbox: FunctionComponent<
  GenericConfirmModalProps
> = (props) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!props.opened) {
      setChecked(false)
    }
  }, [props.opened])

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setChecked(event.target.checked)
    }, [])

  return (
    <GenericConfirmModalLayout {...props} confirmDisabled={!checked}>
      <Checkbox onChange={handleCheckboxChange} checked={checked}>
        <Typography.H5>
          {props.messages.confirmModalCheckboxText &&
            formatMessage(props.messages.confirmModalCheckboxText)}
        </Typography.H5>
      </Checkbox>
    </GenericConfirmModalLayout>
  )
}
