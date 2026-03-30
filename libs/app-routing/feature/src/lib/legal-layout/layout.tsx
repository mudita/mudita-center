/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, useEffect } from "react"
import { Outlet } from "react-router"
import styled from "styled-components"
import { AppActions } from "app-utils/renderer"

export const LegalLayout: FunctionComponent = () => {
  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = e.target as HTMLAnchorElement
      if (
        target.tagName === "A" &&
        target.target === "_blank" &&
        target.href.startsWith("http")
      ) {
        e.preventDefault()
        void AppActions.openExternalLink(target.href)
      }
    })
  }, [])

  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 0 2rem;
`
