/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { Help } from "help/ui"
import { useSelector } from "react-redux"
import { selectHelpCategoriesList } from "../store/help.selectors"
import { useHelp, useHelpSyncListener } from "../helpers/use-help"

export const HelpPage: FunctionComponent = () => {
  // only temporary for test
  useHelp()
  useHelpSyncListener()

  const helpData = useSelector(selectHelpCategoriesList)

  console.log("Redux HelpData:", helpData)

  return <Help />
}
