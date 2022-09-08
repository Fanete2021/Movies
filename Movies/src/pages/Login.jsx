import React, { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { validate } from 'schema-utils';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import { Context } from '../context';
import cl from '../styles/login.module.scss';

function Login() {
    const {setIsAuth} = useContext(Context);
    const router = useHistory();
    const [isLogIn, setIsLogIn] = useState(true);
    var password = "";
    
    const changeMenu = () => {
        setIsLogIn(!isLogIn);
    }

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true');
        router.push('/movies');
    }

    return (
        <div className={cl.login}>
            {isLogIn 
                ?
                <div className={cl.login__choice}>
                    <span className={cl.activeSpan}>Log in</span>
                    <span onClick={changeMenu}>Sign up</span>
                </div>
                :
                <div className={cl.login__choice}>
                    <span onClick={changeMenu}>Log in</span>
                    <span className={cl.activeSpan}>Sign up</span>
                </div>
            }

            <div>
                <form name="data_form" onSubmit={login}>
                    <Input type="text" name="login" placeholder="Login"></Input>
                    <Input type="password" name="password" placeholder="Password" onChange={(e) => password = e.target.value}></Input>
                    {!isLogIn && 
                        <Input type="password"
                         placeholder="Confirm password" 
                         required pattern={password}>
                         </Input>
                    }

                    <Button>Enter</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;