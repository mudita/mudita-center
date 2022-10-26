/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread } from "App/messages/dto"
import { URL_MAIN } from "App/__deprecated__/renderer/constants/urls"
import createRouterPath from "App/__deprecated__/renderer/utils/create-router-path"
import { useHistory } from "react-router"

interface Props {
  activeThread: Thread | undefined
}

interface UseContactNavigationHook {
  openActiveContactDetails: () => void
  openContactDetails: (phoneNumber: string) => void
}

export const useContactNavigation = ({
  activeThread,
}: Props): UseContactNavigationHook => {
  const history = useHistory()

  const openActiveContactDetails = (): void => {
    if (!activeThread) {
      return
    }

    history.push(
      createRouterPath(URL_MAIN.contacts, {
        phoneNumber: activeThread.phoneNumber,
      })
    )
  }

  const openContactDetails = (phoneNumber: string) => {
    history.push(
      createRouterPath(URL_MAIN.contacts, {
        phoneNumber,
      })
    )
  }

  return {
    openActiveContactDetails,
    openContactDetails,
  }
}
