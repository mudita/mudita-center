/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { Modal } from "../../interactive/modal"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import {
  importContactsFromFile,
  setDataTransferProcessStatus,
  startGoogleAuthorization,
} from "generic-view/store"
import { ButtonSecondary } from "../../buttons/button-secondary"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.providerModal.title",
  },
  description: {
    id: "module.genericViews.importContacts.providerModal.description",
  },
  googleButtonLabel: {
    id: "module.genericViews.importContacts.providerModal.googleButtonLabel",
  },
  fileUploadButtonLabel: {
    id: "module.genericViews.importContacts.providerModal.fileUploadButtonLabel",
  },
})

export const ImportContactsProvider = () => {
  const dispatch = useDispatch<Dispatch>()
  return (
    <>
      <Modal.TitleIcon config={{ type: IconType.ContactsBook }} />
      <Modal.Title>{intl.formatMessage(messages.title)}</Modal.Title>
      <p>{intl.formatMessage(messages.description)}</p>
      <ButtonsWrapper config={{ vertical: true }}>
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.googleButtonLabel),
            action: {
              type: "custom",
              callback: () => {
                dispatch(startGoogleAuthorization())
              },
            },
          }}
        >
          <GoogleLogoWrapperStyled>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
          </GoogleLogoWrapperStyled>
        </ButtonSecondary>
        <ButtonWithIconStyled
          config={{
            text: intl.formatMessage(messages.fileUploadButtonLabel),
            icon: IconType.Import,
            action: {
              type: "custom",
              callback: () => {
                dispatch(importContactsFromFile())
                dispatch(
                  setDataTransferProcessStatus({ status: "FILE-SELECT" })
                )
              },
            },
          }}
        />
      </ButtonsWrapper>
    </>
  )
}

const ButtonsWrapper = styled(Modal.Buttons)`
  --min-width: 22rem;
`

const GoogleLogoWrapperStyled = styled.div`
  height: 1.4rem;
  width: 1.4rem;
`

const ButtonWithIconStyled = styled(ButtonSecondary)`
  & > div {
    width: 2rem;
    height: 2rem;
  }
`
