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
    const [isLoading, setLoading] = useState(true);
    const [login, setLogin] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    const loadingGenres = async () => {
        let APIService = "genres";
        const response = await Service.getEntities(APIService);

        setGenres([...genres, ...response.data]);
    }

    const getUser = async () => {
        let data = await Service.getUser();
        setLogin(data);

        if(data) {
            setIsAuth(true);
        }
    }

    useEffect(() => {
        loadingGenres();
        getUser();

        setLoading(false);
    }, [])
    
    return (
        <Context.Provider value={{
            genres, isLoading, login, isAuth, setIsAuth, getUser
        }}>
            <BrowserRouter>
                <Navbar/>
                <AppRouter/>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App;