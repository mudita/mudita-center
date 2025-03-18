/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren, useId } from "react"
import styled from "styled-components"
import { createPortal } from "react-dom"

const headerPortalId = "dashboard-header-"

interface Props {
  className?: string
}

export const DashboardHeader: FunctionComponent<Props> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <LeftPortal />
      <CenterPortal />
      <RightPortal />
    </Wrapper>
  )
}

const Wrapper = styled.header`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: "left center right";
  align-items: stretch;

  padding: 0 ${({ theme }) => theme.app.space.xxl};
  gap: ${({ theme }) => theme.app.space.xxl};
  background: ${({ theme }) => theme.app.color.white};
  border-bottom: 0.1rem solid ${({ theme }) => theme.app.color.grey4};

  > div {
    flex: 1;
    display: flex;
    flex-direction: row;
    white-space: pre;
  }
`

const LeftPortal = styled.div.attrs({ id: headerPortalId + "left" })`
  grid-area: left;
  justify-self: flex-start;
`

const CenterPortal = styled.div.attrs({ id: headerPortalId + "center" })`
  grid-area: center;
  justify-self: center;
`

const RightPortal = styled.div.attrs({ id: headerPortalId + "right" })`
  grid-area: right;
  justify-self: flex-end;
`

export const DashboardHeaderPortal: FunctionComponent<
  PropsWithChildren & { placement?: "left" | "center" | "right" }
> = ({ children, placement = "left" }) => {
  const uid = useId()
  const slot = document.getElementById(headerPortalId + placement)

  if (slot) {
    return createPortal(children, slot, uid)
  }
  return null
}
