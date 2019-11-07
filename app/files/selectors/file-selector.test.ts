import {expect} from "chai";
import { currentPath, selectFiles, selectFilesState } from './file.selector'

test('selects the files state', () => {
  expect(selectFilesState({files: 'files state'} as any)).deep.eq('files state')
})

describe('when filePaths exists', () => {
  test('selects the filePaths', () => {
    expect(selectFiles({files: {filePaths: []}} as any)).deep.eq([])
  })
})

describe('when currentPath exists', () => {
  test('selects the should select currentFolder', () => {
    expect(currentPath({files: {currentFolder: './'}} as any)).deep.eq('./')
  })
})
