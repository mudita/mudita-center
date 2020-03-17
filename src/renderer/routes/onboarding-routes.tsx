import * as React from "react"
import { Redirect, Route, Switch } from "react-router"
import { URL_MAIN } from "Renderer/constants/urls"
import LayoutOnboardingWrapper from "Renderer/wrappers/layout-onboarding-wrapper"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import OnboardingConnecting from "Renderer/components/rest/onboarding/onboarding-connecting.component"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"

export default () => (
  <LayoutOnboardingWrapper>
    <Switch>
      <Redirect
        exact
        from={URL_MAIN.onboarding}
        to={URL_MAIN.onboardingWelcome}
      />
      <Route path={URL_MAIN.onboardingWelcome} component={OnboardingWelcome} />
      <Route
        path={URL_MAIN.onboardingConnecting}
        component={OnboardingConnecting}
      />
      <Route
        path={URL_MAIN.onboardingTroubleshooting}
        component={OnboardingTroubleshooting}
      />
    </Switch>
  </LayoutOnboardingWrapper>
)
