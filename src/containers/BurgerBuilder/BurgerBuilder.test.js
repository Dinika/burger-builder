import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import { createSerializer } from 'enzyme-to-json';
import Burger from '../../components/Burger/Burger';

configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('BurgerBuilder', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initializeIngredients={() => {}} />);
  });

  it('should render with no props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render ingredients', () => {
    const ingredients = { salad: 1 };
    wrapper.setProps({ ingredients });
    expect(wrapper.find(Burger)).toHaveLength(1);
  });
});
