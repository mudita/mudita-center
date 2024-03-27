/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { defineMessages } from "react-intl"
import { ModalTitleIcon } from "../../interactive/modal"
import { IconType } from "generic-view/utils"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { Dispatch } from "Core/__deprecated__/renderer/store"
import { startGoogleAuthorization } from "generic-view/store"

const messages = defineMessages({
  title: {
    id: "module.genericViews.importContacts.providerModal.title",
  },
  description: {
    id: "module.genericViews.importContacts.providerModal.description",
  },
})

export const ImportContactsProvider = () => {
  return (
    <>
      <ModalTitleIcon data={{ type: IconType.ContactsBook }} />
      <h1>{intl.formatMessage(messages.title)}</h1>
      <Article>
        <p>{intl.formatMessage(messages.description)}</p>
        <GoogleSignIn />
      </Article>
    </>
  )
}

const Article = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    padding-bottom: 2.4rem;
  }
`

const GoogleSignIn = () => {
  const dispatch = useDispatch<Dispatch>()

  return (
    <GoogleButtonStyled
      onClick={() => {
        dispatch(startGoogleAuthorization())
      }}
    >
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <div className="gsi-material-button-icon">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            // style="display: block;"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
        </div>
        <span className="gsi-material-button-contents">
          Continue with Google
        </span>
      </div>
    </GoogleButtonStyled>
  )
}

const GoogleButtonStyled = styled.button`
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  border-radius: 0.4rem;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: "Roboto", arial, sans-serif;
  font-size: 1.4rem;
  height: 4rem;
  letter-spacing: 0.025rem;
  outline: none;
  overflow: hidden;
  padding: 0 1.2rem;
  position: relative;
  text-align: center;
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  vertical-align: middle;
  white-space: nowrap;
  width: 24rem;
  max-width: 40rem;
  min-width: min-content;

  & .gsi-material-button-icon {
    height: 2rem;
    margin-right: 1.2rem;
    min-width: 2rem;
    width: 2rem;
  }

  & .gsi-material-button-content-wrapper {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    height: 100%;
    justify-content: center;
    position: relative;
    width: 100%;
  }

  & .gsi-material-button-contents {
    flex-grow: 0;
    font-family: "Roboto", arial, sans-serif;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
  }

  & .gsi-material-button-state {
    transition: opacity 0.218s;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  &:active .gsi-material-button-state,
  &:focus .gsi-material-button-state {
    background-color: #303030;
    opacity: 12%;
  }

  &:hover {
    box-shadow: 0 0.1rem 0.2rem 0 rgba(60, 64, 67, 0.3),
      0 0.1rem 0.3rem 0.1rem rgba(60, 64, 67, 0.15);
  }

  &:hover .gsi-material-button-state {
    background-color: #303030;
    opacity: 8%;
  }
`
