import {expect} from "chai"
import {setCurrentPath} from '../../app/files/actions/files.actions'
import {getInitialState, reducer} from '../../app/files/reducers/files.reducer'

describe('file reducer', () => {
  it('should start with empty path', () => {
    expect(getInitialState().currentFolder).eq('')
  })

  it('should start with empty file paths', () => {
    expect(getInitialState().filePaths).deep.eq([])
  })

  it('should return the state on unrecognized actions', () => {
    const state = getInitialState()
    expect(reducer(state, {type: 'SOME_RANDOM_UNKNOWN'} as any)).eq(state)
  })

  it('should set current path to given', () => {
    const state = getInitialState()
    const expectedState = {...getInitialState(), currentFolder: 'currentPath'}
    expect(reducer(state, setCurrentPath('currentPath'))).deep.eq(expectedState)
  })
})
