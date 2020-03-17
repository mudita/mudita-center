import * as React from "react"
import styled from "styled-components"
import FunctionComponent from "Renderer/types/function-component.interface"
import { textColor, width } from "Renderer/styles/theming/theme-getters"
import Icon from "Renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { Link } from "react-router-dom"
import { URL_MAIN } from "Renderer/constants/urls"

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-auto-rows: auto;
  justify-items: center;
  flex: 1;
  height: 100vh;
  max-width: ${width("viewWidth")};
`

const Header = styled.header`
  width: 100%;
  padding: 4rem 0;
  max-width: 99rem;

  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${textColor("placeholder")};

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

const LayoutOnboardingWrapper: FunctionComponent = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Icon type={Type.MuditaLogoWithText} width={8.6} height={2} />
        <Text
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={{ id: "view.name.onboarding.mainTitle" }}
        />
        <Link to={URL_MAIN.news}>
          <Icon type={Type.Close} />
        </Link>
      </Header>
      {children}
    </Layout>
  )
}

export default LayoutOnboardingWrapper
