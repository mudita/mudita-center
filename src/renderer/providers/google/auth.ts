import { AuthPayload, AuthProviders } from "Renderer/models/auth/auth.typings"
import { ipcRenderer } from "electron-better-ipc"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"
import { SimpleRecord } from "Common/typings"

export const handleGoogleAuth = async (
  cb?: (payload: AuthPayload) => void
): Promise<SimpleRecord> => {
  return new Promise(async (ok) => {
    await ipcRenderer.callMain(GoogleAuthActions.OpenWindow)

    const checker = setInterval(async () => {
      const token: Record<string, string> = await ipcRenderer.callMain(
        GoogleAuthActions.SendData
      )

      if (token) {
        clearInterval(checker)
        cb && cb({ provider: AuthProviders.Google, data: token })
        await ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
        ok(token)
      }
    }, 500)
  })
}
