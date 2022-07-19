/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs from "fs-extra"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { app, dialog, shell } from "electron"
import mapContactsToVCardStrings from "App/contacts/helpers/convert-contacts/map-contacts-to-v-card-strings"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import path from "path"
import { defineMessages } from "react-intl"
import { createFullName } from "App/contacts/helpers/contacts.helpers"

const messages = defineMessages({
  dialogTitle: { id: "module.contacts.exportSaveDialogTitle" },
  defaultFilename: { id: "module.contacts.exportDefaultFilename" },
  button: { id: "module.contacts.exportButton" },
})

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const registerContactsExportListener = () => {
  ipcMain.answerRenderer<Contact[], boolean>(
    IpcRequest.ExportContacts,
    async (contacts) => {
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: intl.formatMessage(messages.dialogTitle, {
          count: contacts.length,
        }),
        defaultPath: path.join(
          app.getPath("documents"),
          intl.formatMessage(messages.defaultFilename, {
            name: createFullName(contacts[0]),
            contactsLeft: contacts.length - 1,
          })
        ),
        properties: ["createDirectory", "showOverwriteConfirmation"],
        filters: [{ name: "vcf", extensions: ["vcf"] }],
      })

      if (!canceled && filePath) {
        await fs.writeFile(
          filePath,
          mapContactsToVCardStrings(contacts),
          "utf-8"
        )
        shell.showItemInFolder(filePath)
        return true
      }

      return false
    }
  )
}

export default registerContactsExportListener
