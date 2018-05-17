import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavItems from './navitems'
import NavItem from './navitem'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    let navitems = null
    
    beforeEach(() => navitems = shallow(<NavItems />))
    
    it('should render 2 items if nuser is NOT ot authenticated', () => {
        expect(navitems.find(NavItem)).toHaveLength(2)
    })
    it('should render 3 items if user IS authenticated', () => {
        navitems.setProps({loggedIn: true})
        expect(navitems.find(NavItem)).toHaveLength(3)
    })
    it('should have a logout link if user IS authenticated', () => {
        navitems.setProps({loggedIn: true})
        expect(navitems.contains(<NavItem link="/logout">Log Out</NavItem>)).toEqual(true)
    })
})