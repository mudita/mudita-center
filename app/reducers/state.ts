import { RouterState } from 'connected-react-router'
import { State as FileState } from '../files/reducers/files.reducer'

export default interface State {
  router: RouterState
  files: FileState
}
