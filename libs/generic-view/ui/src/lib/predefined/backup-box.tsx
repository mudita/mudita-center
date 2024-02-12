/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import styled from "styled-components"
import { ButtonText } from "../buttons/button-text"
import { ButtonPrimary } from "../buttons/button-primary"

export const BackupBox: APIFC = () => {
  return (
    <Wrapper>
      {/*<NoBackupLabel>*/}
      {/*  You haven’t backed up your device yet. Create your first backup file.*/}
      {/*</NoBackupLabel>*/}
      <BackupAvailable>
        <BackupAvailableLabel>Last backup:</BackupAvailableLabel>
        <BackupDate>December 31, 2023</BackupDate>
        <ButtonText
          config={{
            text: "Restore from Last backup",
            action: {
              type: "navigate",
              viewKey: "restore-from-backup",
            },
            modifiers: ["link", "uppercase"],
          }}
        />
      </BackupAvailable>
      <ButtonPrimary
        config={{
          text: "Create backup",
          action: {
            type: "navigate",
            viewKey: "create-backup",
          },
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 17.6rem;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
`

const NoBackupLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  color: ${({ theme }) => theme.color.grey2};
`

const BackupAvailable = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  row-gap: ${({ theme }) => theme.space.xs};
  column-gap: ${({ theme }) => theme.space.lg};
`

const BackupAvailableLabel = styled.p`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.paragraph3};
  line-height: ${({ theme }) => theme.lineHeight.paragraph3};
  color: ${({ theme }) => theme.color.grey2};
  margin: 0;
  letter-spacing: 0.07rem;
`

const BackupDate = styled.p`
  font-size: ${({ theme }) => theme.fontSize.paragraph1};
  line-height: ${({ theme }) => theme.lineHeight.paragraph1};
  margin: 0;
  text-transform: lowercase;

  &:first-letter {
    text-transform: uppercase;
  }
`
