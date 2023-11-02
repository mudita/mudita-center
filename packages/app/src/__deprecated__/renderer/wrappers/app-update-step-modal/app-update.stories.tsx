import React from "react"
import {
  AppUpdateRejected,
  AppUpdateDownloaded,
  AppUpdateError,
  AppUpdateProgress,
  AppUpdatePrivacyPolicy,
} from "App/__deprecated__/renderer/wrappers/app-update-step-modal/app-update.modals"
import {
  ModalBackdrop,
  ModalWrapper,
} from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"

export default {
  title: "App/Update",
}

export const AvailableUpdate = () => {
  return (
    <div>
      <ModalBackdrop />
      <ModalWrapper>
        <AppUpdateRejected open />
      </ModalWrapper>
    </div>
  )
}

AvailableUpdate.story = {
  name: "Available update",
}

export const DownloadedUpdate = () => {
  return (
    <div>
      <ModalBackdrop />
      <ModalWrapper>
        <AppUpdateDownloaded open />
      </ModalWrapper>
    </div>
  )
}

DownloadedUpdate.story = {
  name: "Downloaded update",
}

export const UpdateProgress = () => {
  return (
    <div>
      <ModalBackdrop />
      <ModalWrapper>
        <AppUpdateProgress open />
      </ModalWrapper>
    </div>
  )
}

UpdateProgress.story = {
  name: "Update progress",
}

export const UpdateError = () => {
  return (
    <div>
      <ModalBackdrop />
      <ModalWrapper>
        <AppUpdateError open />
      </ModalWrapper>
    </div>
  )
}

UpdateError.story = {
  name: "Update error",
}

export const UpdateForced = () => {
  return (
    <div>
      <ModalBackdrop />
      <ModalWrapper>
        <AppUpdatePrivacyPolicy
          appLatestVersion="1.1.6"
          appCurrentVersion="1.0.0"
          open
        />
      </ModalWrapper>
    </div>
  )
}

UpdateForced.story = {
  name: "Update forced",
}
