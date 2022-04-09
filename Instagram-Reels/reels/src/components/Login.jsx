import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';



export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, logout, user, setUser} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const history = useNavigate();


    const submitHandler = async () => {
        try {
            setLoading(true);
            const res = await login(email, password);
            setUser(res.user);
            setLoading(false);
            history('/');
        } catch (err) { 
            setLoading(false);
            setError(err.message);
            console.log('error hai');

        }
    }

    return (
        <>
            {
                loading ? <h1>Loading ...</h1> :
                    <>
                        <h1> Login Page</h1>
                        <input type='email' value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type='password' value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button onClick={submitHandler}>Submit</button>

                    </>
            }
        </>
    )
}



