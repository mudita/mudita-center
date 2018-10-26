import { mount } from 'enzyme';
import 'jest-styled-components';
import * as React from "react";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Files, { FilesIntro, FilesTitle } from '../../app/files/components/Files';
import { getInitialState } from '../../app/files/reducers/files.reducer';

describe('files page', () => {

  const mockStore = configureMockStore();
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = mockStore({files: getInitialState()});
    wrapper = mount(<Provider store={store}><Files/></Provider>);
  });

  it('should files intro should', () => {
    const intro = wrapper.find(FilesIntro);
    expect(intro.text()).toEqual('File list below');
  });

  it('should h1 title state be empty', () => {
    const title = wrapper.find(FilesTitle);
    expect(title.text()).toEqual('');
  });

});