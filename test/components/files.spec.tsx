import {shallow} from 'enzyme'
import {Provider} from 'react-redux'
import configureMockStore from 'redux-mock-store';
import Files from '../../app/files/components/Files'

describe('files page', () => {

  const initialState = {output: 10}
  const mockStore = configureMockStore()
  let store: any, wrapper: any


  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = shallow(<Provider store={store}><Files/></Provider>)

  })

  it('should match snapshot', () => {

  })

})