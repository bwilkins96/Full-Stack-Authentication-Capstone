import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = <ProfileButton user={sessionUser} />;
    } else {
        sessionLinks = (
            <div>
                <NavLink className='navLink logIn' to='/login'>Log In</NavLink>
                <NavLink className='navLink signUp' to='/signup'>Sign Up</NavLink>
            </div>
        );
    }

    return (
        <ul className='navBar'>
            <li className='navLinkBar'>
                <NavLink className='navLink' exact to='/'>Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;
