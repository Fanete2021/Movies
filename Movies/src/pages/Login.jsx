import React from 'react';
import { useContext } from 'react';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import { Context } from '../context';

function Login() {
    const {isAuth, setIsAuth} = useContext(Context);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
    }

    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={login}>
                <Input type="text" placeholder="Login"></Input>
                <Input type="password" placeholder="Password"></Input>

                <Button>Enter</Button>
            </form>
        </div>
    );
};

export default Login;