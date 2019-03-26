import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationMenu from './NavigationMenu';

configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('NavigationMenu', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationMenu />);
  });

  it('renders with no props passed', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have 2 NavigationLinks if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should have 3 NavigationLinks if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
