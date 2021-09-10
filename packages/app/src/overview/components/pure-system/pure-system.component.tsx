/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { useHistory } from "react-router"
import { URL_OVERVIEW } from "Renderer/constants/urls"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import {
  PureSystemSection,
  BackWrapper,
  PureSystemTitle,
  PureSystemAbout,
  PureSystemInfoContainer,
  SarButtonComponent,
} from "App/overview/components/pure-system/pure-system.styled"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { Type } from "App/renderer/components/core/icon/icon.config"
import { IconSize } from "App/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"

const messages = defineMessages({
  back: {
    id: "module.overview.pureSystemBack",
  },
  title: {
    id: "module.overview.pureSystem",
  },
  subtitle: {
    id: "module.overview.pureSystemSubtitle",
  },
  about: {
    id: "module.overview.pureSystemAbout",
  },
  serialNumber: {
    id: "module.overview.pureSystemSerialNumber",
  },
  sar: {
    id: "module.overview.pureSystemSar",
  },
  sarInfo: {
    id: "module.overview.pureSystemSarInfo",
  },
})
interface InfoProps {
  title: { id: string }
}
const PureSystemInfo: FunctionComponent<InfoProps> = ({ title, children }) => {
  return (
    <PureSystemInfoContainer>
      <Text displayStyle={TextDisplayStyle.LargeFadedText} message={title} />
      {children}
    </PureSystemInfoContainer>
  )
}
const PureSystem: FunctionComponent = () => {
  const history = useHistory()
  const handleBack = () => {
    history.push(URL_OVERVIEW.root)
  }
  const openSarInfo = () => {}
  return (
    <div>
      <BackWrapper>
        <ButtonComponent
          displayStyle={DisplayStyle.Link2}
          onClick={handleBack}
          labelMessage={messages.back}
          Icon={Type.ArrowLongLeft}
          iconSize={IconSize.Small}
        />
      </BackWrapper>
      <PureSystemSection>
        <PureSystemTitle
          displayStyle={TextDisplayStyle.SecondaryBoldHeading}
          message={messages.title}
        />
        <Text
          displayStyle={TextDisplayStyle.MediumFadedLightText}
          message={messages.subtitle}
        />
      </PureSystemSection>
      <PureSystemSection>
        <PureSystemAbout
          displayStyle={TextDisplayStyle.LargeBoldText}
          message={messages.about}
        />
        <PureSystemInfo title={messages.serialNumber}>
          <Text
            displayStyle={TextDisplayStyle.LargeText}
            message={messages.serialNumber}
          />
        </PureSystemInfo>
        <PureSystemInfo title={messages.sar}>
          <SarButtonComponent
            displayStyle={DisplayStyle.Link3}
            labelMessage={messages.sarInfo}
            onClick={openSarInfo}
          />
        </PureSystemInfo>
      </PureSystemSection>
    </div>
  )
}

export default PureSystem
