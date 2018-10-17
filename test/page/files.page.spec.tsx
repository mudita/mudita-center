import {shallow, ShallowWrapper} from 'enzyme'
import FilesPage from '../../app/files/pages/FilesPage'

let wrapper: ShallowWrapper

describe('files page', () => {

  beforeEach(() => {
    wrapper = shallow(<FilesPage />);
  })

  it('should match snapshot', () => {
    expect(wrapper.dive()).toMatchSnapshot()
  })

})