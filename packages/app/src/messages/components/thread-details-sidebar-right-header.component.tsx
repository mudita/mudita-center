/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { SidebarHeaderButton } from "Renderer/components/core/table/table.component"
import { Feature, flags } from "App/feature-flags"

interface Props {
  contactCreated: boolean
  onContactClick: () => void
  onDeleteClick: () => void
  onCheckClick: () => void
}

const ThreadDetailsSidebarRightHeader: FunctionComponent<Props> = ({
  contactCreated,
  onContactClick,
  onDeleteClick,
  onCheckClick,
}) => {
  return (
    <>
      {flags.get(Feature.DevelopOnly) && (
        <SidebarHeaderButton Icon={Type.Calls} onClick={noop} />
      )}
      {contactCreated ? (
        <SidebarHeaderButton Icon={Type.Contact} onClick={onContactClick} />
      ) : (
        <SidebarHeaderButton Icon={Type.NewContact} onClick={onContactClick} />
      )}
      {flags.get(Feature.DevelopOnly) && (
        <>
          <SidebarHeaderButton
            Icon={Type.BorderCheckIcon}
            onClick={onCheckClick}
          />
          <SidebarHeaderButton Icon={Type.Delete} onClick={onDeleteClick} />
        </>
      )}
    </>
  )
}

export default ThreadDetailsSidebarRightHeader
