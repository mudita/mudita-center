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
import { selectDataMigrationFeatures } from "generic-view/store"

interface Props {
  features: DataMigrationFeature[]
  onStartMigration: VoidFunction
}

export const TransferSetup: FunctionComponent<Props> = ({
  features,
  onStartMigration,
}) => {
  const selectedFeatures = useSelector(selectDataMigrationFeatures)

  return (
    <>
      <Wrapper>
        <SourceSelector />
        <FeaturesSelector features={features} />
      </Wrapper>
      <Footer>
        <p>You may need to unlock your Pure before data transfer can start.</p>
        <ButtonPrimary
          config={{
            text: "Start transfer",
            action: {
              type: "custom",
              callback: onStartMigration,
            },
            disabled: selectedFeatures.length === 0,
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

  p {
    font-size: ${({ theme }) => theme.fontSize.labelText};
    line-height: ${({ theme }) => theme.lineHeight.labelText};
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.color.grey1};
  }

  button {
    min-width: 16.4rem;
  }
`
