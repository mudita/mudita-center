/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createGlobalStyle } from "styled-components"
import { modalTransitionDuration } from "./app-theme/constants"

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${({ theme }) => theme.app.color.grey6};
    font-family: GT Pressura, Roboto Condensed, sans-serif;
    /* stylelint-disable unit-allowed-list */
    font-size: 10px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  #root > * {
    height: 100%;
  }

  #root * {
    box-sizing: border-box;
  }

  .generic-modal-overlay {
    --modal-transition-duration: ${modalTransitionDuration}ms;
    --modal-transition-timing-function: ease-out;
    --modal-opacity: 1;
    --modal-visibility: visible;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.app.color.black + "4D"};
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity var(--modal-transition-duration) var(--modal-transition-timing-function);

    &.hidden {
      background-color: transparent;
    }

    &.ReactModal__Overlay--after-open {
      opacity: 1;
    }

    &.ReactModal__Overlay--before-close {
      opacity: 0;
    }
  }

  .generic-modal {
    box-sizing: border-box;

    width: auto;
    max-height: var(--modal-max-height);
    overflow: hidden;
    outline: none;
    display: flex;
    flex-direction: column;
    position: relative;

    .modal-content {
      background-color: ${({ theme }) => theme.app.color.white};
      border-radius: ${({ theme }) => theme.app.radius.sm};
      overflow: hidden;
      box-shadow: 0 2rem 10rem 0 ${({ theme }) => theme.app.color.black + "26"};
    }

    .modal-close-icon-button:nth-child(2) {
      display: none;
    }

    * {
      box-sizing: border-box;
    }
  }

  *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.app.color.grey2};
    border-radius: 0.25rem;
  }

  .__react_component_tooltip {
    pointer-events: auto !important;

    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }

    &.show {
      opacity: 1 !important;
      padding: 0 !important;
    }

    &.place-bottom {
      margin-top: -0px !important;
    }

    &.place-top {
      margin-top: -0px !important;
    }
  }
`
