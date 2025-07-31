/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "Core/__deprecated__/renderer/store"
import { defineMessages } from "react-intl"
import { ModalSize } from "Core/__deprecated__/renderer/components/core/modal/modal.interface"
import { ModalDialog } from "Core/ui"
import {
  DisplayStyle,
  Size,
} from "Core/__deprecated__/renderer/components/core/button/button.config"
import ButtonComponent from "Core/__deprecated__/renderer/components/core/button/button.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Core/__deprecated__/renderer/components/core/text/text.component"
import { borderColor } from "Core/core/styles/theming/theme-getters"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { Interval, SettingsIntervalForm } from "./settings-interval-form"
import { SettingsSourceForm, Source } from "./settings-source-form"
import { selectQuotations, selectQuotationsSettings } from "../store/selectors"
import { setQuotationsSettings } from "../store/actions"
import { updateQuotationsSettingsRequest } from "../service/requests"

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
  handleClose?: (saved?: boolean) => void
}

export const SettingsModal: FunctionComponent<Props> = ({
  open,
  handleClose,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const settingsFromDevice = useSelector(selectQuotationsSettings)
  const customQuotationsCount = useSelector(selectQuotations).length

  const [selectedSource, setSelectedSource] = useState<Source>(
    settingsFromDevice.source || Source.Predefined
  )
  const [selectedInterval, setSelectedInterval] = useState<Interval>(
    settingsFromDevice.interval || "AtMidnight"
  )

  const hasChanges =
    settingsFromDevice.source !== selectedSource ||
    settingsFromDevice.interval !== selectedInterval

  const handleSave = async () => {
    const response = await updateQuotationsSettingsRequest({
      interval: selectedInterval as string | number,
      group: selectedSource as string,
    })

    if (response.ok) {
      dispatch(
        setQuotationsSettings({
          source: selectedSource as Source,
          interval: selectedInterval as Interval,
        })
      )
    }
    handleClose?.(response.ok)
  }

  useEffect(() => {
    if (settingsFromDevice.source && settingsFromDevice.interval) {
      setSelectedSource(settingsFromDevice.source)
      setSelectedInterval(settingsFromDevice.interval)
    }
  }, [settingsFromDevice, open])

  return (
    <ModalDialog
      open={open}
      closeable
      closeModal={() => handleClose?.()}
      title={intl.formatMessage(messages.title)}
      size={ModalSize.MediumNew}
      closeButton={false}
    >
      <Section>
        <SectionTitle message={messages.sourceTitle} />
        <SettingsSourceForm
          selectedSource={selectedSource}
          setSelectedSource={setSelectedSource}
          customQuotationsCount={customQuotationsCount}
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
        onClick={handleSave}
        displayStyle={DisplayStyle.Primary}
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
