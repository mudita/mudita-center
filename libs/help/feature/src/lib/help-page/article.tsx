/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Article } from "help/ui"
import { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { selectHelpCategoriesList } from "../store/help.selectors"
import { useHelp, useHelpSyncListener } from "../helpers/use-help"

export const ArticlePage: FunctionComponent = () => {
  // only temporary for test
  useHelp()
  useHelpSyncListener()

  const helpData = useSelector(selectHelpCategoriesList)

  console.log("Redux HelpData:", helpData)

  return <Article />
}
