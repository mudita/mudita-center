/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled from "styled-components"
import { FunctionComponent } from "react"
import { Link } from "react-router"
import { DashboardHeaderPortal } from "./header"
import { Button } from "app-theme/ui"
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
          <Button
            to={".."}
            type={ButtonType.Text}
            icon={IconType.ArrowBack}
          >
            <BackTitle>back to {title}</BackTitle>
          </Button>
        ) : (
          <PageTitle>{title}</PageTitle>
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

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.app.color.black};
  font-size: ${({ theme }) => theme.app.fontSize.headline4};
  line-height: ${({ theme }) => theme.app.lineHeight.headline4};
  font-weight: ${({ theme }) => theme.app.fontWeight.bold};
  letter-spacing: 0.02em;
  margin: 0;
`

const BackLink = styled(Link)`
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  padding: ${({ theme }) => theme.app.space.xs} 0;
  color: ${({ theme }) => theme.app.color.grey1};
`

const BackTitle = styled.h1`
  color: ${({ theme }) => theme.app.color.grey1};
  font-size: ${({ theme }) => theme.app.fontSize.buttonText};
  line-height: ${({ theme }) => theme.app.lineHeight.buttonText};
  font-weight: ${({ theme }) => theme.app.fontWeight.regular};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
`
