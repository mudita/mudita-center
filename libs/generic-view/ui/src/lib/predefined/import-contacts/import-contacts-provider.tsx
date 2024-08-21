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
  setImportProcessStatus,
  startImportAuthorization,
} from "generic-view/store"
import { ButtonSecondary } from "../../buttons/button-secondary"
import { ButtonText } from "../../buttons/button-text"
import { useHistory } from "react-router"
import { URL_MAIN } from "Core/__deprecated__/renderer/constants/urls"

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
  outlookButtonLabel: {
    id: "module.genericViews.importContacts.providerModal.outlookButtonLabel",
  },
  fileUploadButtonLabel: {
    id: "module.genericViews.importContacts.providerModal.fileUploadButtonLabel",
  },
  needHelpButtonLabel: {
    id: "module.genericViews.importContacts.providerModal.needHelpButtonLabel",
  },
})

export const ImportContactsProvider = () => {
  const dispatch = useDispatch<Dispatch>()
  const history = useHistory()

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
                dispatch(startImportAuthorization("GOOGLE"))
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
        <ButtonSecondary
          config={{
            text: intl.formatMessage(messages.outlookButtonLabel),
            action: {
              type: "custom",
              callback: () => {
                dispatch(startImportAuthorization("OUTLOOK"))
              },
            },
          }}
        >
          <OutlookLogoWrapperStyled>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="17" height="17" fill="url(#pattern0_23775_61142)" />
              <defs>
                <pattern
                  id="pattern0_23775_61142"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_23775_61142"
                    transform="scale(0.0208333)"
                  />
                </pattern>
                <image
                  id="image0_23775_61142"
                  width="48"
                  height="48"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAeklEQVR4nO3UMQqAMBBE0QUL7+F5LOxyxlSewTvZj/10Q8AI/gfbBpb8pAoAPklt08j4eft5aGSKBRo3IBJK8IgNv1CKhAwJpUjIkFCKhGYnBPzd0m+NjJ+na9XIFAt0bkAklOARG36hFAkZEkqRkCGhFAnNTggA6g0PsZwml5fu+o4AAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          </OutlookLogoWrapperStyled>
        </ButtonSecondary>
        <ButtonWithIconStyled
          config={{
            text: intl.formatMessage(messages.fileUploadButtonLabel),
            icon: IconType.Import,
            action: {
              type: "custom",
              callback: () => {
                dispatch(importContactsFromFile())
                dispatch(setImportProcessStatus({ status: "FILE-SELECT" }))
              },
            },
          }}
        />
        <HelpLink
          config={{
            text: intl.formatMessage(messages.needHelpButtonLabel),
            action: {
              type: "custom",
              callback: () => {
                history.push(
                  `${URL_MAIN.help}/6w2eIEGxkQVxScg0T2at98/7IYVFZKS6eQnPk9WLeUoFI`
                )
              },
            },
            modifiers: ["link", "hover-underline"],
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
const OutlookLogoWrapperStyled = styled.div`
  height: 1.7rem;
  width: 1.7rem;
`

const ButtonWithIconStyled = styled(ButtonSecondary)`
  & > div {
    width: 2rem;
    height: 2rem;
  }
`

const HelpLink = styled(ButtonText)`
  && {
    height: 2rem;
    min-height: 2rem;
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.labelText};
  }
`
