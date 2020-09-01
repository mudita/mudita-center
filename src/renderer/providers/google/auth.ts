import { AuthPayload, AuthProviders } from "Renderer/models/auth/auth.typings"
import { ipcRenderer } from "electron-better-ipc"
import { GoogleAuthActions } from "Common/enums/google-auth-actions.enum"

import { getPeople } from "Renderer/providers/google/people"

export const handleGoogleAuth = async (
  cb?: (payload: AuthPayload) => void
): Promise<void> => {
  await ipcRenderer.callMain(GoogleAuthActions.OpenWindow)
  let data: Record<string, string> | null = null

  const checker = setInterval(async () => {
    const token: Record<string, string> = await ipcRenderer.callMain(
      "send-data"
    )

    if (token) {
      data = token
      clearInterval(checker)
      cb && cb({ provider: AuthProviders.Google, data })
      await ipcRenderer.callMain(GoogleAuthActions.CloseWindow)

      await getPeople(data)
    }
  }, 500)
}
