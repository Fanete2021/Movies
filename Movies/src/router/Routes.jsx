import Actors from '../pages/Actors';
import Movies from '../pages/Movies';
import Login from '../pages/Login';

export const privateRoutes = [
    { path: '/movies', component: Movies, exact: true },
    { path: '/actors', component: Actors, exact: true },
]

export const publicRoutes = [
    { path: '/login', component: Login, exact: true },
]