import { routerReducer as routing } from 'react-router-redux';
import { combineReducers, Reducer } from 'redux';
import fileExplorer, { FileReducer } from "../files/reducers/file-explorer.reducer";

const rootReducer = combineReducers({
  fileExplorer,
  routing: routing as Reducer<any>
});

export interface RootState {
  fileExplorer: FileReducer;
}

export default rootReducer;
