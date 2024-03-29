/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Core/__deprecated__/common/requests/ipc-request.enum"
import { Contact } from "Core/contacts/reducers/contacts.interface"
import { app, dialog, shell } from "electron"
import mapContactsToVCardStrings from "Core/contacts/helpers/convert-contacts/map-contacts-to-v-card-strings"
import { intl } from "Core/__deprecated__/renderer/utils/intl"
import path from "path"
import { defineMessages } from "react-intl"
import { createFullName } from "Core/contacts/helpers/contacts.helpers"
import logger from "Core/__deprecated__/main/utils/logger"
import { ExportContactsResult } from "Core/contacts/constants"

const messages = defineMessages({
  dialogTitle: { id: "module.contacts.exportSaveDialogTitle" },
  defaultFilename: { id: "module.contacts.exportDefaultFilename" },
  button: { id: "module.contacts.exportButton" },
})

// workaround for https://github.com/electron/electron/issues/21935
const getFileName = (contacts: Contact[]) => {
  return `${intl.formatMessage(messages.defaultFilename, {
    name: createFullName(contacts[0]),
    contactsLeft: contacts.length - 1,
  })}.vcf`
}

const registerContactsExportListener = (): void => {
  ipcMain.answerRenderer<Contact[], Promise<ExportContactsResult>>(
    IpcRequest.ExportContacts,
    async (contacts) => {
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: intl.formatMessage(messages.dialogTitle, {
          count: contacts.length,
        }),
        defaultPath: path.join(app.getPath("documents"), getFileName(contacts)),
        properties: ["createDirectory", "showOverwriteConfirmation"],
        filters: [{ name: "vcf", extensions: ["vcf"] }],
      })

      if (canceled) {
        return ExportContactsResult.Cancelled
      }
      try {
        if (!canceled && filePath) {
          await fs.writeFile(
            filePath,
            mapContactsToVCardStrings(contacts),
            "utf-8"
          )
          shell.showItemInFolder(filePath)
          return ExportContactsResult.Ok
        }
      } catch (error) {
        logger.error(`Export contacts error. Data: ${JSON.stringify(error)}`)
      }
      return ExportContactsResult.Failed
    }
  )
}

export default registerContactsExportListener
