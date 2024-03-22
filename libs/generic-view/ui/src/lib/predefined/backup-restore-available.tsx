/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useSelector } from "react-redux"
import { isEmpty } from "lodash"
import { selectLastBackup } from "generic-view/store"
import { APIFC } from "generic-view/utils"

interface Config {
  buttonLabel?: string
}

export const BackupRestoreAvailable: APIFC<undefined, Config> = ({
  children,
}) => {
  const lastBackup = useSelector(selectLastBackup)

  if (isEmpty(lastBackup)) {
    return null
  }

  return children
}

export default BackupRestoreAvailable
