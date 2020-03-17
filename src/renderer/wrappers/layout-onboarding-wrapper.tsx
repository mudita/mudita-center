import * as React from "react"
import styled from "styled-components"
import FunctionComponent from "Renderer/types/function-component.interface"
import { width } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"

const Layout = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  max-width: ${width("viewWidth")};
`

const Header = styled.header`
  max-width: 99rem;
`

const LayoutOnboardingWrapper: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Icon type={Type.MuditaLogo} />
        <Text displayStyle={TextDisplayStyle.LargeFadedText} />
      </Header>
      {children}
    </Layout>
  )
}

export default LayoutOnboardingWrapper
