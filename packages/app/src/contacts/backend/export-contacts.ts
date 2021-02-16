/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import fs from "fs-extra"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "App/contacts/store/contacts.type"
import { app, dialog, shell } from "electron"
import convertContacts from "App/contacts/helpers/convert-contacts/convert-contacts"
import { intl } from "Renderer/utils/intl"
import path from "path"
import { defineMessages } from "react-intl"
import { createFullName } from "App/contacts/store/contacts.helpers"

const messages = defineMessages({
  dialogTitle: { id: "view.name.phone.contacts.export.saveDialogTitle" },
  defaultFilename: { id: "view.name.phone.contacts.export.defaultFilename" },
  button: { id: "view.name.phone.contacts.export.button" },
})

const registerContactsExportListener = () => {
  ipcMain.answerRenderer(
    IpcRequest.ExportContacts,
    async (contacts: Contact[]) => {
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
        await fs.writeFile(filePath, convertContacts(contacts), "utf-8")
        shell.showItemInFolder(filePath)
        return true
      }

      return false
    }
  )
}

export default registerContactsExportListener
