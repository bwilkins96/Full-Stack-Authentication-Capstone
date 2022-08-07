import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) {return}
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) {return}

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    return (
        <div className='profMenu'>
            <button className='profileIcon' onClick={openMenu}>
                <i className='fas fa-user-circle' />
            </button>
            {showMenu && (
                <ul className='dropDown'>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button className='logOut' onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
