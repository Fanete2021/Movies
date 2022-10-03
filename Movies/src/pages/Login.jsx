import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Service from '../API/Service';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import { Context } from '../context';
import useInput from '../hooks/useInput';
import cl from '../styles/login.module.scss';

function Login() {
    const {getUser} = useContext(Context);
    const router = useHistory();
    const [isLogIn, setIsLogIn] = useState(true);
    const login = useInput('', {length: {min: 5, max: 16}, regex: /^[a-zA-Z0-9]$/});
    const password = useInput('', {length: {min: 5, max: 12}});
    const repeatedPassword = useInput('', {repeat: password.value});
    const [formValid, setFormValid] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if ((login.error || password.error || repeatedPassword.error || password.value !== repeatedPassword.value) && !isLogIn) {
            //Sign up
            setFormValid(false);
        }
        else if ((login.error || password.error) && isLogIn) {
            //Log in
            setFormValid(false);
        } 
        else {
            setFormValid(true);
        }
    }, [login.error, password.error, repeatedPassword.error])
    
    const changeMenu = () => {
        setIsLogIn(!isLogIn);
        login.resetInput();
        password.resetInput();
        repeatedPassword.resetInput();
        setSubmitError("")
    }

    const submit = async (event) => {
        event.preventDefault();

        let params = {
            login: login.value,
            password: password.value,
        };
        
        if(isLogIn){
            let isLogged = await Service.login(params);

            if(isLogged) {
                getUser();
                router.push('/movies');
            }
            else {
                setSubmitError("The username or password is incorrect");
            }
        }
        else{
            params = {...params, role: "admin"};
            let isRegistred = await Service.register(params);

            if(isRegistred) {
                changeMenu();
            } 
            else {
                setSubmitError("Such a user is already registered");
            }
        }
    }

    useEffect(() => {
        if (!isLogIn)
            repeatedPassword.resetInput();
    }, [password.value])

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

            <hr></hr>

            <div>
                <form name="data_form" onSubmit={submit}>
                    {(submitError) && <div className={cl.submitError}>{submitError}</div>}
                    {(login.isDirty && login.error) && <div className={cl.error}>{login.error}</div>}
                    <div className={cl.field}>
                        <div className={cl.user}></div>
                        <div className={cl.inp}>
                            <Input type="text" 
                                name="login" 
                                placeholder="Login" 
                                value={login.value}
                                onBlur={e => login.onBlur(e)}
                                onChange={(e) => login.onChange(e)}>
                            </Input>
                        </div>
                    </div>

                    {(password.isDirty && password.error) && <div className={cl.error}>{password.error}</div>}
                    <div className={cl.field}>
                        <div className={cl.password}></div>
                        <div className={cl.inp}>
                            <Input type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={password.value} 
                                onBlur={e => password.onBlur(e)}
                                onChange={(e) => password.onChange(e)}>
                            </Input>
                        </div>
                    </div>
                    

                    {(repeatedPassword.isDirty && repeatedPassword.error) && <div className={cl.error}>{repeatedPassword.error}</div>}
                    {!isLogIn &&
                        <div className={cl.field}>
                            <div className={cl.repeatedPassword}></div>
                            <div className={cl.inp}>
                                <Input type="password"
                                    placeholder="Confirm password" 
                                    name="repeatedPassword"
                                    value={repeatedPassword.value}
                                    onBlur={e => repeatedPassword.onBlur(e)}
                                    onChange={(e) => repeatedPassword.onChange(e)}>
                                </Input>
                            </div>
                        </div>
                    }

                    <Button disabled={!formValid}>Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;