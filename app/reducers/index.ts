import { combineReducers } from 'redux';
import { reducer as fileReducer} from "../files/reducers/files";
import RootState from './state'

const rootReducer = combineReducers<RootState>({
  files: fileReducer
});

export default rootReducer;
