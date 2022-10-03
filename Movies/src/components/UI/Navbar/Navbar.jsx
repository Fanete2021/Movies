import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Service from '../../../API/Service';
import { Context } from '../../../context';
import cl from './navbar.module.scss';

const Navbar = function () {
    
    const links = [
        {
            link: "/movies",
            title: "Movies"
        },
        {
            link: "/actors",
            title: "Actors"
        },
    ]

    const {isAuth, setIsAuth, login} = useContext(Context);

    const logout = async () => {
        setIsAuth(false);
        await Service.logout();
    }
    
    return (
        <div className={cl.navbar}>
            {links.map((link, index) => {
                return <Link 
                            key={index} 
                            to={link.link}>
                                {link.title}
                        </Link>
            })}

            {isAuth 
                ?
                    <Link
                        to={"/login"} 
                        onClick={logout}>
                            {login}
                    </Link>
                :
                    <Link  
                        key={4} 
                        to={"/login"}>
                            Log in / Sign Up
                    </Link>
            }
        </div>
    );
};

export default Navbar;