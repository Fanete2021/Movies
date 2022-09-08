import React from 'react';
import { useContext } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Context } from '../context';
import { publicRoutes, privateRoutes } from '../router/Routes';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isLoading} = useContext(Context);
    const {isAuth} = useContext(Context);

    if (isLoading)
    {
        return <Loader/>;
    }

    return (
        isAuth
            ?
                <Switch>
                    {privateRoutes.map(route =>
                        <Route 
                            component={route.component}
                            path={route.path} 
                            exact={route.exact} 
                            key={route.path} 
                        />
                    )}
                    <Redirect to='/movies'/>
                </Switch>
            :
                <Switch>
                    {publicRoutes.map(route =>
                        <Route 
                            component={route.component}
                            path={route.path} 
                            exact={route.exact} 
                            key={route.path} 
                        />
                    )}
                    <Redirect to='/movies'/>
                </Switch>
    );
};

export default AppRouter;