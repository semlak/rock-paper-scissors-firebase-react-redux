import React from 'react';
import ReactDOM from 'react-dom';

// import Enzyme, { shallow } from 'enzyme';
import { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';




import { App } from './App';

const mockStore = configureStore();

const initialStoreState = {
  auth: null,
  game: {
    gameStatus: "NO_GAME",
  },
  gathering: null,
  modals: {
    authenticationModalOpen: false
  }
};

// Enzyme.configure({ adapter: new Adapter() });
// const fakeStore = {};

describe('components', () => {
  describe('App', () => {
    const mockFetchUserFn = jest.fn();
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App fetchUser={mockFetchUserFn} />);
    });
    it('shallow renders without crashing', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders without crashing', () => {
      const store = mockStore(initialStoreState);
      const div = document.createElement('div');
      ReactDOM.render(<Provider store={store}><App fetchUser={mockFetchUserFn} /></Provider>, div);
      ReactDOM.unmountComponentAtNode(div);
    });
    it('sends a request to fetch user upon mount', () => {
      expect(mockFetchUserFn).toHaveBeenCalled();
    });
  });
});
