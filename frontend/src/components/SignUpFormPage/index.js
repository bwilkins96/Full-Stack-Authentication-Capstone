import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';


function SignUpFormPage () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) {
        return <Redirect to='/' />;
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signUp({ email, username, password }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) { setErrors(data.errors) }
                });
        } else {
            return setErrors(['Confirm Password field must be the same as Password field']);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
             <ul>
                {errors.map((err, idx) => {
                    return <li key={idx}>{err}</li>
                })}
            </ul>
            <label htmlFor='email'>Email</label>
            <input
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <label htmlFor='username'>Username</label>
            <input
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <button className='logInBtn' type='submit'>Sign Up</button>
        </form>
    );
}

export default SignUpFormPage;
