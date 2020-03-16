import { storiesOf } from "@storybook/react"
import React from "react"
import OnboardingWelcome from "Renderer/components/rest/onboarding/onboarding-welcome.component"
import { action } from "@storybook/addon-actions"

storiesOf("Components|Onboarding", module).add("Welcome", () => {
  return (
    <OnboardingWelcome
      onContinue={action("Continue")}
      setAutostartOption={action("Autostart")}
    />
  )
})
