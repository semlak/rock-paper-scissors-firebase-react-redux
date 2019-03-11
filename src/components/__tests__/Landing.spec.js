import React from 'react';
// import Enzyme, { shallow } from 'enzyme';
// import { shallow, render } from 'enzyme';
import { shallow, } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
// import configureStore from 'redux-mock-store'; // Smart components

import { Button } from 'reactstrap';

import { Landing } from '../../components/Landing';

// Enzyme.configure({ adapter: new Adapter() });

// const mockStore = configureStore();
// const initialState = {
//   auth: null,
//   modals: {
//     authenticationModalOpen: false,
//   },
//   gathering: {},
//   game: {
//     gameStatus: 'NO_GAME',
//   },
// };

// const store = mockStore(initialState);/Sna
    
// function setup() {
//   const props = {
//     toggleAuthenticationModal: jest.fn(),
//   };
//
//   const enzymeWrapper = shallow(<Landing {...props} />);
//
//   return {
//     props,
//     enzymeWrapper,
//   };
// }


describe('components', () => {
  describe('Landing', () => {
    let wrapper;
    const mockModalToggler = jest.fn();
    beforeEach(() => {
      wrapper = shallow(<Landing toggleAuthenticationModal={mockModalToggler} />);
      // wrapper = render(<Landing toggleAuthenticationModal={mockModalToggler} />);
    });

    it('should dispatch event to show Authentication modal when clicked', () => {
      // const wrapper = shallow(<Landing authenticationModalOpen={mockModalToggler}/>);

      const modalToggleButton = wrapper.find(Button);
      expect(modalToggleButton).toBeTruthy();
      modalToggleButton.simulate('click', { preventDefault: jest.fn() });
      // expect(store.getActions()).toMatchSnapshot();
      expect(mockModalToggler).toHaveBeenCalled();
    });

    it('should render to match snapshot', () => {
      const component = wrapper;
      expect(toJson(component)).toMatchSnapshot();
    });
    // it('should render self and subcomponents', () => {
    //   const { enzymeWrapper } = setup();
    //   expect(enzymeWrapper.find('div').hasClass('row')).toBe(true);
    //   expect(enzymeWrapper.find('div').hasClass('social-signin-container')).toBe(true);
    //
    //   expect(enzymeWrapper.find('a').hasClass('social-signin')).toBe(true);
    //   const modalToggleButton = enzymeWrapper.find('a.social-signin');
    //   modalToggleButton.simulate('click');
    //   // expect(modalToggleButton)
    // });
  });
});
