import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// console.log('setting up enzyme');
Enzyme.configure({ adapter: new Adapter() });
