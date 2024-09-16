/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import * as React from "react"
import styled from "styled-components"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import {
  textColor,
  backgroundColor,
  width,
} from "Core/core/styles/theming/theme-getters"
import Icon from "Core/__deprecated__/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { LayoutBlankWrapperTestIds } from "Core/__deprecated__/renderer/wrappers/wrappers-test-ids.enum"
import { IconType } from "Core/__deprecated__/renderer/components/core/icon/icon-type"
import { useHandleActiveDeviceAborted } from "Core/overview/components/overview-screens/pure-overview/use-handle-active-device-aborted.hook"
import { DisplayStyle } from "Core/__deprecated__/renderer/components/core/button/button.config"
import { Close } from "Core/__deprecated__/renderer/components/core/modal/modal.styled.elements"

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
  max-width: 107.2rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${textColor("disabled")};

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

const MainTitle = styled(Text)`
  padding-top: 0.3rem;
`

interface Props {
  closeable?: boolean
  onClose?: () => void
}

const LayoutBlankWrapper: FunctionComponent<Props> = ({
  children,
  onClose,
  closeable = true,
}) => {
  const handleActiveDeviceAborted = useHandleActiveDeviceAborted()

  const handleClosePage = () => {
    void handleActiveDeviceAborted()
    onClose && onClose()
  }

  return (
    <Layout>
      <Header>
        <Icon type={IconType.MuditaLogoWithText} width={8.9} height={2} />
        <MainTitle
          displayStyle={TextDisplayStyle.Paragraph3}
          message={{ id: "module.onboarding.mainTitle" }}
        />
        {closeable && (
          <Close
            onClick={handleClosePage}
            data-testid={LayoutBlankWrapperTestIds.Close}
            displayStyle={DisplayStyle.IconOnly}
            Icon={IconType.Close}
          />
        )}
      </Header>
      {children}
    </Layout>
  )
}

export default LayoutBlankWrapper
