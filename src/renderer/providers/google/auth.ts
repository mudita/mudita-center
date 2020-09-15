import { AuthPayload, AuthProviders } from "Renderer/models/auth/auth.typings"
import { ipcRenderer } from "electron-better-ipc"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"

export const handleGoogleAuth = async (
  cb?: (payload: AuthPayload) => void
): Promise<void> => {
  await ipcRenderer.callMain(GoogleAuthActions.OpenWindow)

  const checker = setInterval(async () => {
    const token: Record<string, string> = await ipcRenderer.callMain(
      GoogleAuthActions.SendData
    )

    if (token) {
      clearInterval(checker)
      cb && cb({ provider: AuthProviders.Google, data: token })
      await ipcRenderer.callMain(GoogleAuthActions.CloseWindow)
    }
  }, 500)
}
