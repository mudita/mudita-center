/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  HarmonyMsc,
  HarmonyMscProcessErrorName,
  HarmonyMscProcessState,
} from "devices/harmony-msc/models"
import { GenericFailedModal, GenericProgressModal } from "app-theme/ui"
import { formatMessage } from "app-localize/utils"
import { useActiveDeviceQuery } from "devices/common/feature"
import { flashHarmonyMsc } from "devices/harmony-msc/feature"
import { McHarmonyMscRecoveryModeMessages } from "../../harmony-msc-recovery-mode.messages"
import { RecoveryModeTerminalSetupModal } from "./recovery-mode-terminal-setup-modal/recovery-mode-terminal-setup-modal"
import { RecoveryModeProgressModal } from "./recovery-mode-progress-modal"
import { RecoveryModeCompleteModal } from "./recovery-mode-complete-modal"
import { RecoveryModeFinalStepModal } from "./recovery-mode-final-step-modal"
import {
  RECOVERING_STATE,
  recoveryModeFlowProgressMessageMap,
} from "./recovery-mode-flow-utils"

interface Props {
  opened: boolean
  onClose: VoidFunction
}

export const RecoveryModeFlow: FunctionComponent<Props> = ({
  opened,
  onClose,
}) => {
  const [flowState, setFlowState] = useState<HarmonyMscProcessState>(
    HarmonyMscProcessState.Idle
  )
  const [recoverProgress, setRecoverProgress] = useState<number>(0)
  const { data: activeHarmony } = useActiveDeviceQuery<HarmonyMsc>()
  const abortControllerRef = useRef(new AbortController())

  const recover = useCallback(async (device: HarmonyMsc) => {
    abortControllerRef.current = new AbortController()
    const result = await flashHarmonyMsc({
      device,
      signal: abortControllerRef.current.signal,
      onProgress: ({ state, progress }) => {
        progress && setRecoverProgress(progress)
        setFlowState(state)
      },
    })

    if (result.ok) {
      setFlowState(HarmonyMscProcessState.Complete)
    }

    if (
      !result.ok &&
      result.error.name !== HarmonyMscProcessErrorName.Aborted
    ) {
      setFlowState(HarmonyMscProcessState.Failed)
    }
  }, [])

  const clearState = useCallback(() => {
    setFlowState(HarmonyMscProcessState.Idle)
    setRecoverProgress(0)
  }, [])

  const handleClose = useCallback(() => {
    abortControllerRef.current.abort()
    clearState()
    onClose()
  }, [clearState, onClose])

  useEffect(() => {
    if (!(opened && activeHarmony)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      clearState()
    } else if (flowState === HarmonyMscProcessState.Idle) {
      setFlowState(HarmonyMscProcessState.GettingFilesDetails)
      void recover(activeHarmony)
    }
  }, [activeHarmony, recover, clearState, opened, flowState])

  return (
    <>
      <RecoveryModeProgressModal
        opened={RECOVERING_STATE.has(flowState)}
        progress={recoverProgress}
        progressBarMessage={formatMessage(
          recoveryModeFlowProgressMessageMap[flowState]
        )}
      />
      <GenericProgressModal
        opened={flowState === HarmonyMscProcessState.Restarting}
        title={formatMessage(
          McHarmonyMscRecoveryModeMessages.recoveryModeRestartModalTitle
        )}
        description={formatMessage(
          McHarmonyMscRecoveryModeMessages.recoveryModeRestartModalDescription
        )}
      />
      <RecoveryModeTerminalSetupModal
        opened={flowState === HarmonyMscProcessState.SetupTerminal}
        onClose={handleClose}
      />
      <RecoveryModeFinalStepModal
        opened={flowState === HarmonyMscProcessState.FinalStep}
        onClose={handleClose}
      />
      <RecoveryModeCompleteModal
        opened={flowState === HarmonyMscProcessState.Complete}
        onClose={handleClose}
      />
      <GenericFailedModal
        opened={flowState === HarmonyMscProcessState.Failed}
        onClose={handleClose}
        title={formatMessage(
          McHarmonyMscRecoveryModeMessages.recoveryModeFailedModalTitle
        )}
        description={formatMessage(
          McHarmonyMscRecoveryModeMessages.recoveryModeFailedModalDescription
        )}
      />
    </>
  )
}
