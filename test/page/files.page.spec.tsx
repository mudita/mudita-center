import { shallow, ShallowWrapper } from 'enzyme';
import 'jest-styled-components'
import * as React from "react";
import FilesPage from '../../app/files/pages/FilesPage';

let wrapper: ShallowWrapper;
const FilesPageAny = FilesPage as any;

describe('files page', () => {

  beforeEach(() => {
    wrapper = shallow(<FilesPageAny/>);
  });

  it('should match snapshot', () => {
    expect(wrapper.dive()).toMatchSnapshot();
  });

});