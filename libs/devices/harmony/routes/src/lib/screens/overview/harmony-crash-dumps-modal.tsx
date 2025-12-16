/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Modal } from "app-theme/ui"

interface Props {
  opened: boolean
}

export const HarmonyCrashDumpsModal: FunctionComponent<Props> = ({
  opened,
}) => {
  return (
    <Modal opened={opened}>
      <p>Crash Dumps modal</p>
    </Modal>
  )
}
