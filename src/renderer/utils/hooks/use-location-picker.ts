const { dialog } = require("electron").remote

const useLocationPicker = async (
  defaultPath?: string
): Promise<string | null> => {
  const {
    filePaths: [path],
    canceled,
  } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    defaultPath,
  })

  if (canceled) {
    return null
  } else {
    return path
  }
}

export default useLocationPicker
