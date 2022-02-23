/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { useHistory } from "react-router"
import { URL_OVERVIEW } from "Renderer/constants/urls"
import {
  PureSystemSection,
  BackWrapper,
  PureSystemTitle,
  PureSystemAbout,
  PureSystemInfoContainer,
  AutoWidthButtonComponent,
} from "App/overview/components/pure-system/pure-system.styled"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { Type } from "App/renderer/components/core/icon/icon.config"
import { IconSize } from "App/renderer/components/core/icon/icon.component"
import Text, {
  TextDisplayStyle,
} from "App/renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { PureSystemTestIds } from "App/overview/components/pure-system/pure-system-test-ids.enum"
import { ipcRenderer } from "electron-better-ipc"
import { PureSystemActions } from "App/common/enums/pure-system-actions.enum"

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
  withButton?: boolean
}
const PureSystemInfo: FunctionComponent<InfoProps> = ({
  title,
  withButton = false,
  children,
}) => {
  return (
    <PureSystemInfoContainer withButton={withButton}>
      <Text
        displayStyle={TextDisplayStyle.Paragraph1}
        color="secondary"
        message={title}
      />
      {children}
    </PureSystemInfoContainer>
  )
}
interface Props {
  serialNumber?: string
}

const PureSystem: FunctionComponent<Props> = ({ serialNumber }) => {
  const history = useHistory()
  const handleBack = () => {
    history.push(URL_OVERVIEW.root)
  }
  const openSarInfo = () => {
    ipcRenderer.callMain(PureSystemActions.SarOpenWindow)
  }
  return (
    <div>
      <BackWrapper>
        <AutoWidthButtonComponent
          displayStyle={DisplayStyle.Link1}
          onClick={handleBack}
          labelMessage={messages.back}
          Icon={Type.ArrowLongLeft}
          iconSize={IconSize.Small}
          data-testid={PureSystemTestIds.BackButton}
        />
      </BackWrapper>
      <PureSystemSection>
        <PureSystemTitle
          displayStyle={TextDisplayStyle.Headline3}
          message={messages.title}
        />
        <Text
          displayStyle={TextDisplayStyle.Paragraph4}
          color="secondary"
          message={messages.subtitle}
        />
      </PureSystemSection>
      <PureSystemSection>
        <PureSystemAbout
          displayStyle={TextDisplayStyle.Headline4}
          message={messages.about}
        />
        <PureSystemInfo title={messages.serialNumber}>
          <Text
            displayStyle={TextDisplayStyle.Paragraph1}
            data-testid={PureSystemTestIds.SerialNumber}
          >
            {serialNumber}
          </Text>
        </PureSystemInfo>
        <PureSystemInfo title={messages.sar} withButton>
          <AutoWidthButtonComponent
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
