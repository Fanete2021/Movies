import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import GenreService from './API/GenreService';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { Context } from './context';
import './styles/app.scss';

function App() {
    //Initialization of actors and genres data
    const [genres, setGenres] = useState([])
    const [numberActiveLink, setNumberActiveLink] = useState(0);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const loadingGenres = async () => {
        const response = await GenreService.getGenres();
        setGenres([...genres, ...response]);
    }

    useEffect(() => {
        loadingGenres();

        if(localStorage.getItem('auth')){
            setIsAuth(true);
        }

        setLoading(false);
    }, [])

    const changeActiveLink = (number) => {
        setNumberActiveLink(number);
    }
    
    return (
        <Context.Provider value={{
            genres, isAuth, setIsAuth, isLoading
        }}>
            <BrowserRouter>
                <Navbar numberActiveLink={numberActiveLink} changeActiveLink={changeActiveLink}/>
                <AppRouter/>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App;