import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationMenu from './NavigationMenu';

configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('NavigationMenu', () => {
  it('renders with no props passed', () => {
    const wrapper = shallow(<NavigationMenu />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have 2 NavigationLinks if not authenticated', () => {
    const wrapper = shallow(<NavigationMenu />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
