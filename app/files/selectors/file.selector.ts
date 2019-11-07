import RootState from "../../reducers/state"

export const selectFilesState = (state: RootState) => state.files
export const selectFiles = (state: RootState) =>
  selectFilesState(state).filePaths
export const currentPath = (state: RootState) =>
  selectFilesState(state).currentFolder
