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
import styled from "styled-components"
import { ButtonSize, ButtonType } from "app-theme/models"
import { formatCustomMessage, formatMessage } from "app-localize/utils"
import { Button, Checkbox, Typography } from "app-theme/ui"
import { McHarmonyMscRecoveryModeMessages } from "../../harmony-msc-recovery-mode.messages"
import { recoveryModeWarningDescriptionList } from "./recovery-mode-warning-description-list"
import { RecoveryModeWarningBox } from "./recovery-mode-warning-box"

interface RecoveryModeWarningProps {
  onConfirm: VoidFunction
}

export const RecoveryModeWarning: FunctionComponent<
  RecoveryModeWarningProps
> = ({ onConfirm }) => {
  const [checked, setChecked] = useState(false)

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> =
    useCallback((event) => {
      setChecked(event.target.checked)
    }, [])

  return (
    <RecoveryModeWarningBox>
      <RecoveryModeWarningContent>
        <ul>
          {recoveryModeWarningDescriptionList.map((message, index) => (
            <li key={index}>
              <Typography.P3 color={"grey1"}>
                {formatMessage(message, formatCustomMessage.textFormatters)}
              </Typography.P3>
            </li>
          ))}
        </ul>

        <RecoveryModeWarningConfirmation>
          <Checkbox onChange={handleCheckboxChange} checked={checked}>
            <Typography.H5 color={"grey1"}>
              {formatMessage(
                McHarmonyMscRecoveryModeMessages.recoveryModeWarningConfirmationLabel
              )}
            </Typography.H5>
          </Checkbox>
        </RecoveryModeWarningConfirmation>
        <RecoveryModeWarningConfirmationButtonWrapper>
          <Button
            type={ButtonType.Primary}
            size={ButtonSize.Big}
            onClick={onConfirm}
            message={
              McHarmonyMscRecoveryModeMessages.recoveryModeWarningButtonText.id
            }
            disabled={!checked}
          />
        </RecoveryModeWarningConfirmationButtonWrapper>
      </RecoveryModeWarningContent>
    </RecoveryModeWarningBox>
  )
}

const RecoveryModeWarningContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin: 0;
    padding-left: 1rem;
    list-style-type: square;
  }
`

const RecoveryModeWarningConfirmation = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.4rem;
    font-weight: 700;
    max-width: 100%;
  }
`

const RecoveryModeWarningConfirmationButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
