/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import styled from "styled-components"
import { ButtonSize, ButtonType, ModalSize } from "app-theme/models"
import {
  QuotationSettings,
  QuotationSettingsGroup,
  QuotationSettingsInterval,
} from "devices/common/models"
import { borderColor } from "app-theme/utils"
import { formatMessage, Messages } from "app-localize/utils"
import { Button, Modal, Typography } from "app-theme/ui"
import { quotationsMessages } from "../quotations.messages"
import {
  SettingsFormSource,
  SettingsFormSourceProps,
} from "./settings-form-source"
import { SettingsFormInterval } from "./settings-form-interval"
import { DEFAULT_QUOTATION_SETTINGS } from "./quotations-settings.const"

export interface QuotationsSettingsFormProps {
  opened: boolean
  settings?: QuotationSettings
  customQuotationsCount: number
  updateSettings: (settings: QuotationSettings) => Promise<void>
  onClose: (saved?: boolean) => void
  messages: {
    updateSettingsFormSourceTitle: Messages
  } & SettingsFormSourceProps["messages"]
}

export const QuotationsSettingsForm: FunctionComponent<
  QuotationsSettingsFormProps
> = ({
  opened,
  settings,
  customQuotationsCount,
  updateSettings,
  messages,
  onClose,
}) => {
  const [selectedSource, setSelectedSource] = useState<QuotationSettingsGroup>(
    settings?.group || DEFAULT_QUOTATION_SETTINGS.group
  )
  const [selectedInterval, setSelectedInterval] =
    useState<QuotationSettingsInterval>(
      settings?.interval || DEFAULT_QUOTATION_SETTINGS.interval
    )

  useEffect(() => {
    if (!settings?.group || !settings?.interval) {
      return
    }

    setSelectedSource(settings.group)
    setSelectedInterval(settings.interval)
  }, [settings?.group, settings?.interval])

  useEffect(() => {
    if (opened) {
      setSelectedSource(settings?.group || DEFAULT_QUOTATION_SETTINGS.group)
      setSelectedInterval(
        settings?.interval || DEFAULT_QUOTATION_SETTINGS.interval
      )
    }
  }, [opened, settings?.group, settings?.interval])

  const hasChanges = useMemo(() => {
    if (!settings?.group || !settings?.interval) {
      return false
    }

    return (
      settings.group !== selectedSource ||
      settings.interval !== selectedInterval
    )
  }, [selectedInterval, selectedSource, settings?.group, settings?.interval])

  const handleSave = useCallback(async () => {
    void updateSettings({
      interval: selectedInterval,
      group: selectedSource,
    })
  }, [selectedInterval, selectedSource, updateSettings])

  return (
    <Modal
      opened={opened}
      size={ModalSize.Medium}
      customStyles={{ width: "56.6rem", alignItems: "start" }}
    >
      <Modal.CloseButton onClick={onClose} />
      <Typography.H3>
        {formatMessage(quotationsMessages.updateSettingsFormTitle)}
      </Typography.H3>
      <SectionsWrapper>
        <Section>
          <SectionTitle message={messages.updateSettingsFormSourceTitle.id} />
          <SettingsFormSource
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            customQuotationsCount={customQuotationsCount}
            messages={messages}
          />
        </Section>
        <Separator />
        <Section>
          <SectionTitle
            message={quotationsMessages.updateSettingsFormIntervalTitle.id}
          />
          <SettingsFormInterval
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        </Section>
      </SectionsWrapper>
      <ActionButton
        message={quotationsMessages.updateSettingsFormActionButtonLabel.id}
        size={ButtonSize.Medium}
        disabled={!hasChanges}
        onClick={handleSave}
        type={ButtonType.Primary}
      />
    </Modal>
  )
}

const SectionsWrapper = styled.div`
  padding: 1.6rem 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: flex-start;
`

const SectionTitle = styled(Typography.H4)`
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

const ActionButton = styled(Button)`
  margin: 0 auto;
`
