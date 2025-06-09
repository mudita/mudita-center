/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import {
  setCheckingForUpdate,
  setCheckingForUpdateFailed,
  toggleApplicationUpdateAvailable,
  setLatestVersion,
  setCurrentVersion,
  showUpdateAvailableModal,
  hideUpdateAvailableModal,
  showUpdateNotAvailableModal,
  hideUpdateNotAvailableModal,
  showUpdateDownloadProgressModal,
  hideUpdateDownloadProgressModal,
  showUpdateDownloadedModal,
  hideUpdateDownloadedModal,
  showUpdateInstallProgressModal,
  hideUpdateInstallProgressModal,
  showUpdateCompletedModal,
  hideUpdateCompletedModal,
  showUpdateFailedModal,
  hideUpdateFailedModal,
  setUpdateDownloadProgress,
  setUpdateInstallProgress,
} from "./settings.actions"

export interface SettingsState {
  updateAvailable: boolean
  checkingForUpdate: boolean
  checkingForUpdateFailed: boolean
  latestVersion?: string
  currentVersion?: string
  updateAvailableModalOpen: boolean
  updateNotAvailableModalOpen: boolean
  updateDownloadProgressModalOpen: boolean
  updateDownloadedModalOpen: boolean
  updateInstallProgressModalOpen: boolean
  updateCompletedModalOpen: boolean
  updateFailedModalOpen: boolean
  updateDownloadProgress: number
  updateInstallProgress: number
}

const initialState: SettingsState = {
  updateAvailable: false,
  checkingForUpdate: false,
  checkingForUpdateFailed: false,
  latestVersion: undefined,
  currentVersion: undefined,
  updateDownloadProgress: 0,
  updateInstallProgress: 0,
  updateAvailableModalOpen: false,
  updateNotAvailableModalOpen: false,
  updateDownloadProgressModalOpen: false,
  updateDownloadedModalOpen: false,
  updateInstallProgressModalOpen: false,
  updateCompletedModalOpen: false,
  updateFailedModalOpen: false,
}

export const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCheckingForUpdate, (state, action) => {
      state.checkingForUpdate = action.payload
    })
    .addCase(setCheckingForUpdateFailed, (state, action) => {
      state.checkingForUpdateFailed = action.payload
    })
    .addCase(toggleApplicationUpdateAvailable, (state, action) => {
      state.updateAvailable = action.payload
    })
    .addCase(setLatestVersion, (state, action) => {
      state.latestVersion = action.payload
    })
    .addCase(setCurrentVersion, (state, action) => {
      state.currentVersion = action.payload
    })
    .addCase(setUpdateDownloadProgress, (state, action) => {
      state.updateDownloadProgress = action.payload
    })
    .addCase(setUpdateInstallProgress, (state, action) => {
      state.updateInstallProgress = action.payload
    })
    .addCase(showUpdateAvailableModal, (state) => {
      state.updateAvailableModalOpen = true
    })
    .addCase(hideUpdateAvailableModal, (state) => {
      state.updateAvailableModalOpen = false
    })
    .addCase(showUpdateNotAvailableModal, (state) => {
      state.updateNotAvailableModalOpen = true
    })
    .addCase(hideUpdateNotAvailableModal, (state) => {
      state.updateNotAvailableModalOpen = false
    })
    .addCase(showUpdateDownloadProgressModal, (state) => {
      state.updateDownloadProgressModalOpen = true
    })
    .addCase(hideUpdateDownloadProgressModal, (state) => {
      state.updateDownloadProgressModalOpen = false
    })
    .addCase(showUpdateDownloadedModal, (state) => {
      state.updateDownloadedModalOpen = true
    })
    .addCase(hideUpdateDownloadedModal, (state) => {
      state.updateDownloadedModalOpen = false
    })
    .addCase(showUpdateInstallProgressModal, (state) => {
      state.updateInstallProgressModalOpen = true
    })
    .addCase(hideUpdateInstallProgressModal, (state) => {
      state.updateInstallProgressModalOpen = false
    })
    .addCase(showUpdateCompletedModal, (state) => {
      state.updateCompletedModalOpen = true
    })
    .addCase(hideUpdateCompletedModal, (state) => {
      state.updateCompletedModalOpen = false
    })
    .addCase(showUpdateFailedModal, (state) => {
      state.updateFailedModalOpen = true
    })
    .addCase(hideUpdateFailedModal, (state) => {
      state.updateFailedModalOpen = false
    })
})
