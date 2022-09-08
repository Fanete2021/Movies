import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import Service from './API/Service';
import AppRouter from './components/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { Context } from './context';
import './styles/app.scss';

function App() {
    //Initialization of actors and genres data
    const [genres, setGenres] = useState([])
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const loadingGenres = async () => {
        let APIService = "genres";
        const response = await Service.getEntities(APIService);

        setGenres([...genres, ...response.data]);
    }

    useEffect(() => {
        loadingGenres();

        if(localStorage.getItem('auth')){
            setIsAuth(true);
        }

        setLoading(false);
    }, [])
    
    return (
        <Context.Provider value={{
            genres, isAuth, setIsAuth, isLoading
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App;