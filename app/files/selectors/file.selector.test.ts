import { currentPath, selectFiles, selectFilesState } from './file.selector'

it('should select the session state', () => {
  expect(selectFilesState({files: 'files state'} as any)).toEqual('files state')
})

describe('when filePaths exists', () => {
  it('should select the filePaths', () => {
    expect(selectFiles({files: {filePaths: []}} as any)).toBe([])
  })
})

describe('when currentPath exists', () => {
  it('should select the should select currentFolder', () => {
    expect(currentPath({files: {currentFolder: './'}} as any)).toBe('./')
  })
})
