/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useRef, useState } from "react"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalDialog } from "Core/ui"
import { Size } from "Core/__deprecated__/renderer/components/core/button/button.config"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { Interval, SettingsIntervalForm } from "./settings-interval-form"
import { SettingsSourceForm, Source } from "./settings-source-form"
import { borderColor } from "Core/core/styles/theming/theme-getters"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"

const messages = defineMessages({
  title: {
    id: "module.quotations.settingsModal.title",
  },
  actionButtonLabel: {
    id: "module.quotations.settingsModal.saveButton",
  },
  sourceTitle: {
    id: "module.quotations.settingsModal.source.title",
  },
  intervalTitle: {
    id: "module.quotations.settingsModal.interval.title",
  },
})

interface Props {
  open: boolean
  handleClose?: VoidFunction
}

export const SettingsModal: FunctionComponent<Props> = ({
  open,
  handleClose,
}) => {
  const currentSource = useRef(Source.Custom)
  const currentInterval = useRef<Interval>(1440)

  const [selectedSource, setSelectedSource] = useState(Source.Custom)
  const [selectedInterval, setSelectedInterval] = useState<Interval>(1440)

  const hasChanges =
    currentSource.current !== selectedSource ||
    currentInterval.current !== selectedInterval

  return (
    <ModalDialog
      open={open}
      closeable
      closeModal={handleClose}
      title={intl.formatMessage(messages.title)}
      size={ModalSize.MediumNew}
      closeButton={false}
    >
      <Section>
        <SectionTitle message={messages.sourceTitle} />
        <SettingsSourceForm
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
        />
      </Section>
      <Separator />
      <Section>
        <SectionTitle message={messages.intervalTitle} />
        <SettingsIntervalForm
          selectedInterval={selectedInterval}
          setSelectedInterval={setSelectedInterval}
        />
      </Section>
      <ActionButton
        label={intl.formatMessage(messages.actionButtonLabel)}
        size={Size.FixedSmall}
        disabled={!hasChanges}
        onClick={() => {
          handleClose?.()
        }}
      />
    </ModalDialog>
  )
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: flex-start;
`

const SectionTitle = styled(Text).attrs((attrs) => ({
  ...attrs,
  displayStyle: TextDisplayStyle.Headline4,
}))`
  height: 3.2rem;
  display: flex;
  align-items: center;
`

const Separator = styled.hr`
  width: calc(100% + 4.8rem);
  height: 0.1rem;
  background-color: ${borderColor("list")};
  border: none;
  margin: 2.4rem -2.4rem;
`

const ActionButton = styled(ButtonComponent)`
  margin: 4rem auto 0;
`
