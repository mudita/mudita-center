import fs from "fs-extra"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Contact } from "App/contacts/store/contacts.type"
import { app, dialog } from "electron"
import convertContacts from "App/contacts/helpers/convert-contacts/convert-contacts"
import { intl } from "Renderer/utils/intl"
import path from "path"

const registerContactsExportListener = () => {
  ipcMain.answerRenderer(
    IpcRequest.ExportContacts,
    async (contacts: Contact[]) => {
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: intl.formatMessage(
          { id: "view.name.phone.contacts.export.saveDialogTitle" },
          { count: contacts.length }
        ),
        defaultPath: path.join(app.getPath("documents"), "contacts"),
        buttonLabel: "Save",
        properties: ["createDirectory", "showOverwriteConfirmation"],
        filters: [{ name: "vcf", extensions: ["vcf"] }],
      })

      if (!canceled && filePath) {
        fs.writeFileSync(filePath, convertContacts(contacts), "utf-8")
      }
    }
  )
}

export default registerContactsExportListener
