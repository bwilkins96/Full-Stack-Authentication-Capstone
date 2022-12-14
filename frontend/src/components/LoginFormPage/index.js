import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return <Redirect to='/' />;
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) { setErrors(data.errors) };

                if (res.status === 403) {
                    setErrors(['Server authentication error. Please refresh page or load application in different browser.']);
                }
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((err, idx) => {
                    return <li key={idx} className='error'>{err}</li>
                })}
            </ul>
            <label htmlFor='credential'>Username or Email</label>
            <input
                type='text'
                value={credential}
                onChange={e => setCredential(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                value={password}
                onChange={ e => setPassword(e.target.value)}
                required
            />
            <button className='logInBtn' type='submit'>Log In</button>
        </form>
    );
}

export default LoginFormPage;
