/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import styled from "styled-components"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import {
  textColor,
  backgroundColor,
  width,
} from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Link } from "react-router-dom"
import { URL_MAIN } from "Renderer/constants/urls"
import { LayoutBlankWrapperTestIds } from "Renderer/wrappers/wrappers-test-ids.enum"

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-auto-rows: auto;
  justify-items: center;
  flex: 1;
  height: 100vh;
  max-width: ${width("viewWidth")};
  background-color: ${backgroundColor("row")};
  margin: 0 auto;
`

const Header = styled.header`
  width: 100%;
  padding: 2.7rem 0 3rem;
  max-width: 99rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${textColor("secondary")};

    &:before {
      margin: 0 0.8rem;
      content: "";
      width: 0.1rem;
      height: 2.4rem;
      background-color: currentColor;
      display: block;
      box-shadow: 0 0 0.1rem currentColor;
    }
  }
`

interface Props {
  recoveryMode?: boolean
  onClose?: () => void
}

const MainTitle = styled(Text)`
  padding-top: 0.3rem;
`

const LayoutBlankWrapper: FunctionComponent<Props> = ({
  children,
  recoveryMode,
  onClose,
}) => {
  return (
    <Layout>
      <Header>
        <Icon type={Type.MuditaLogoWithText} width={8.6} height={2} />
        <MainTitle
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={{ id: "module.onboarding.mainTitle" }}
        />
        {!recoveryMode && (
          <Link
            to={URL_MAIN.news}
            onClick={onClose}
            data-testid={LayoutBlankWrapperTestIds.Close}
          >
            <Icon type={Type.Close} />
          </Link>
        )}
      </Header>
      {children}
    </Layout>
  )
}

export default LayoutBlankWrapper
