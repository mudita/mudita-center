/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { SidebarHeaderButton } from "Renderer/components/core/table/table.component"
import { IconSize } from "Renderer/components/core/icon/icon.component"

const production = process.env.NODE_ENV === "production"

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
      {!production && (
        <SidebarHeaderButton
          Icon={Type.Calls}
          onClick={noop}
          iconSize={IconSize.Big}
        />
      )}
      {contactCreated ? (
        <SidebarHeaderButton
          Icon={Type.Contact}
          onClick={onContactClick}
          iconSize={IconSize.Big}
        />
      ) : (
        <SidebarHeaderButton
          Icon={Type.NewContact}
          onClick={onContactClick}
          iconSize={IconSize.Big}
        />
      )}
      {/* TODO: turn on in https://appnroll.atlassian.net/browse/PDA-802 */}
      {!production && (
        <>
          <SidebarHeaderButton
            Icon={Type.BorderCheckIcon}
            onClick={onCheckClick}
            iconSize={IconSize.Big}
          />
          <SidebarHeaderButton
            Icon={Type.Delete}
            onClick={onDeleteClick}
            iconSize={IconSize.Big}
          />
        </>
      )}
    </>
  )
}

export default ThreadDetailsSidebarRightHeader
