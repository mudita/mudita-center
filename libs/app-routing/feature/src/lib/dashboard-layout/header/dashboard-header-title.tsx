/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { FunctionComponent } from "react"
import { DashboardHeaderPortal } from "./header"
import { Button, Typography } from "app-theme/ui"
import { ButtonType, IconType } from "app-theme/models"

interface Props {
  title: string
  back?: boolean
}

export const DashboardHeaderTitle: FunctionComponent<Props> = ({
  title,
  back,
}) => {
  return (
    <DashboardHeaderPortal>
      <Wrapper data-testid="dashboard-header-title">
        {back ? (
          <Button to={".."} type={ButtonType.Text} icon={IconType.ArrowBack}>
            back to {title}
          </Button>
        ) : (
          <Typography.H4 as={"h1"}>{title}</Typography.H4>
        )}
      </Wrapper>
    </DashboardHeaderPortal>
  )
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
`
