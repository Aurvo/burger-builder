import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { BurgerBuilder } from './burgerbuilder'
import BuildControls from '../../components/burger/buildcontrols/buildcontrols'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper = null
    
    beforeEach(() => wrapper = shallow(<BurgerBuilder />))
    
    it('should render 2 items if nuser is NOT ot authenticated', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})