/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { SourceSelector } from "./components/source-selector"
import { FeaturesSelector } from "./components/features-selector"
import { ButtonPrimary } from "../../buttons/button-primary"
import { DataMigrationFeature } from "generic-view/models"
import styled from "styled-components"
import { useSelector } from "react-redux"
import {
  selectDataMigrationFeatures,
  selectDataMigrationPureBusy,
  selectDataMigrationSourceDevice,
  selectDataMigrationStatus,
} from "generic-view/store"
import { defineMessages } from "react-intl"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import { SpinnerLoader } from "../../shared/spinner-loader"

const messages = defineMessages({
  unlockInfo: {
    id: "module.genericViews.dataMigration.transferSetup.unlockInfo",
  },
  transferButton: {
    id: "module.genericViews.dataMigration.transferSetup.transferButton",
  },
  pureNotReady: {
    id: "module.genericViews.dataMigration.transferSetup.pureNotReady",
  },
})

interface Props {
  features: DataMigrationFeature[]
  onStartMigration: VoidFunction
}

export const TransferSetup: FunctionComponent<Props> = ({
  features,
  onStartMigration,
}) => {
  const sourceDevice = useSelector(selectDataMigrationSourceDevice)
  const selectedFeatures = useSelector(selectDataMigrationFeatures)
  const pureBusyId = useSelector(selectDataMigrationPureBusy)
  const dataMigrationStatus = useSelector(selectDataMigrationStatus)

  const pureBusy = pureBusyId === sourceDevice?.serialNumber

  return (
    <>
      <Wrapper>
        <SourceSelector />
        <FeaturesSelector features={features} />
      </Wrapper>
      <Footer>
        {dataMigrationStatus === "IDLE" && pureBusy ? (
          <FooterMessage>
            <FooterSpinner dark />
            <p>{intl.formatMessage(messages.pureNotReady)}</p>
          </FooterMessage>
        ) : (
          <FooterMessage>
            <p>{intl.formatMessage(messages.unlockInfo)}</p>
          </FooterMessage>
        )}
        <ButtonPrimary
          config={{
            text: intl.formatMessage(messages.transferButton),
            actions: [
              {
                type: "custom",
                callback: onStartMigration,
              },
            ],
            disabled: pureBusy || selectedFeatures.length === 0,
          }}
        />
      </Footer>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxl};
  padding: ${({ theme }) => theme.space.xxl};
  flex: 1;
  overflow: auto;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 8.8rem;
  min-height: 8.8rem;
  border-top: 0.1rem solid ${({ theme }) => theme.color.grey4};
  background-color: ${({ theme }) => theme.color.white};
  padding-left: 7.3rem;
  padding-right: 3.2rem;
  box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.08);

  button {
    min-width: 16.4rem;
  }
`

const FooterMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;

  p {
    font-size: ${({ theme }) => theme.fontSize.labelText};
    line-height: ${({ theme }) => theme.lineHeight.labelText};
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.color.grey1};
  }
`

const FooterSpinner = styled(SpinnerLoader)`
  margin-left: -4.1rem;
`
