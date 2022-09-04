import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../context';
import cl from './navbar.module.scss';

const Navbar = function ({numberActiveLink, changeActiveLink}) {
    
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

    const {isAuth, setIsAuth} = useContext(Context);

    useEffect(() => {
        let number = 0;

        for (let index = 1; index < links.length; ++index)
        {
            if (links[index].link === document.location.pathname)
            {
                number = index;
                break;
            }
        }

        changeActiveLink(number);
    } , []);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth', )
    }
    
    return (
        <div className={cl.navbar}>
            {links.map((link, index) => {
                if (numberActiveLink === index){
                    return <Link key={index} className={cl.navbar__activeLink} to={link.link}>{link.title}</Link>
                }
                else  
                {
                    return <Link 
                                key={index} 
                                className={cl.navbar__link} 
                                to={link.link}
                                onClick={() => changeActiveLink(index)}>
                                    {link.title}
                            </Link>
                }
            })}

            <a onClick={logout}>Logout</a>
        </div>
    );
};

export default Navbar;