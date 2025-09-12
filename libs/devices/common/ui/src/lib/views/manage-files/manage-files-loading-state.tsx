/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import styled from "styled-components"
import { IconType } from "app-theme/models"
import { Icon, Typography } from "app-theme/ui"
import { manageFilesMessages } from "./manage-files.messages"

export const ManageFilesLoadingState: FunctionComponent = () => {
  return (
    <Wrapper>
      <Typography.H3 message={manageFilesMessages.loadStateText.id} />
      <Icon type={IconType.Spinner} size={4.8} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.app.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem 0;
`
