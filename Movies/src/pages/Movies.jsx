import React, { useEffect, useState } from 'react';
import Button from '../components/UI/Button/Button';
import Loader from '../components/UI/Loader/Loader';
import MovieFilter from '../components/UI/Filter/MovieFilter';
import MovieForm from '../components/UI/Movie/MovieForm';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import { contains } from '../utils/contains';
import useDebounce from '../hooks/useDebounce';
import PageNavigation from '../components/UI/PageNavigation/PageNavigation';
import Creator from '../components/UI/Creator/Creator';
import '../styles/infoPages.scss';
import Service from '../API/Service';
import MovieItem from '../components/UI/Movie/MovieItem';
import List from '../components/UI/List/List';
import { useContext } from 'react';
import { Context } from '../context';
import { sleep } from '../utils/sleep';


function Movies() {
    const [movies, setMovies] = useState([]);
    const [changeableMovie, setChangeableMovie] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const [limitMovies, setLimitMovies] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState({ title: '', genres: [], actors: [], minPremiereYear: 1895, maxPremiereYear: 2030 });
    const debouncedFilter = useDebounce(filter, 1000); //Processing the request after 1s
    const [visibleForm, setVisibleForm] = useState(false);
    const [typeForm, setTypeForm] = useState("create");
    const [totalCountMovies, setTotalCountMovies] = useState(0);
    const APIService = 'movies';
    const {isAuth} = useContext(Context);

    const [fetchMovies, isMovieLoading] = useFetching(async (limit, page) => {
        //Recording [limit] movies and getting their actors, genres

        let params = {
            title: filter.title,
            ActorIds: filter.actors.map(a => a.id),
            GenreIds: filter.genres.map(g => g.id),
            limit: limit,
            page: page,
            minPremiereYear: filter.minPremiereYear,
            maxPremiereYear: filter.maxPremiereYear,
        };

        const response =  await Service.getEntities(APIService, params);

        setTotalCountMovies(response.headers['x-total-count']);
        setTotalPages(getPageCount(response.headers['x-total-count'], limitMovies));
        
        setMovies(response.data);
    })

    //When the page starts, we load the movies
    useEffect(() => {
        fetchMovies(limitMovies, 1);
    }, [])

    //When changing the page or the interval between the filter,
    useEffect(() => {
        fetchMovies(limitMovies, 1);
    }, [debouncedFilter])

    const createMovie = async (movie, count) => {
        if(totalPages === 0)
        {
            setTotalPages(1);
        }

        let newMovies = [];

        for(let iter = 0; iter < count; ++iter)
        {
            movie = {
                ...movie, id: await Service.addEntity(movie, APIService)
            }

            setVisibleForm(false);
            setTotalCountMovies(Number(totalCountMovies) + count);

            if (movies.length + iter + 1 < 10) {
                //Checking for a match with the filter
                if (contains(movie.genres.map(g => g.id), filter.genres.map(g => g.id)) &&
                    contains(movie.actors.map(a => a.id), filter.actors.map(a => a.id)) &&
                    movie.title.toLowerCase().includes(filter.title.toLowerCase()))
                {
                    newMovies.push(movie);
                }
            }
        }

        setMovies([...movies, ...newMovies])
        setTotalPages(getPageCount(parseInt(totalCountMovies) + count, limitMovies));
    }

    const changeMovie = async (movie) => {    
        setVisibleForm(false);
        await Service.changeEntity(movie, APIService);

        let indexMovie = movies.findIndex(m => m.id === movie.id);
        setMovies([...movies, movies[indexMovie] = movie]);
    }

    const removeMovie = async (movie) => {
        await Service.deleteEntity(movie.id, APIService);
        
        setTotalCountMovies(totalCountMovies - 1);
        let filterMovies = movies.filter(m => m.id !== movie.id);

        setMovies(filterMovies);

        if (currentPage !== totalPages)
        {
            let params = {
                title: filter.title,
                ActorIds: filter.actors.map(a => a.id),
                GenreIds: filter.genres.map(g => g.id),
                limit: 1,
                page: currentPage * 10
            };

            const response =  await Service.getEntities(APIService, params);
            filterMovies = [...filterMovies, ...response.data];

            sleep(400);
            setMovies(filterMovies);
        }
        

        if ((totalCountMovies - 1) % 10 === 0)
            setTotalPages(totalPages - 1);

        if (currentPage !== 1 && movies.length === 1) 
        {
            setCurrentPage(currentPage - 1);
            fetchMovies(limitMovies, currentPage - 1);
        }
    }
        
    const changePage = (page) => {
        if (page < 1)
        {
            setCurrentPage(1);
            fetchMovies(limitMovies, 1);
        }
        else if (page > totalPages)
        {
            setCurrentPage(totalPages);
            fetchMovies(limitMovies, totalPages);
        }
        else 
        {
            setCurrentPage(page);
            fetchMovies(limitMovies, page);
        }
    }
    
    const changeStateForm = (type) => {
        setVisibleForm(true); 
        setTypeForm(type);
    }

    const getMovieItem = (movie) => {
        return <MovieItem remove={removeMovie} movie={movie} isAuth={isAuth}
                          changeStateForm={changeStateForm} setChangeableMovie={setChangeableMovie}/>
    }


    return (
        <div className="movies">
            <div className="filter">
                <MovieFilter filter={filter} setFilter={setFilter}/>
            </div>

            <Button disabled={!isAuth} onClick={() => {changeStateForm("create"); setChangeableMovie();}}>
                Add
            </Button>

            {visibleForm &&
                <Creator setVisible={setVisibleForm}>
                    <MovieForm create={createMovie} change={changeMovie} type={typeForm} changeableMovie={changeableMovie}/>
                </Creator>
            }

            <hr/>

            {isMovieLoading 
                ?
                <div className="loader"><Loader /></div>
                :
                <div>
                    <List countEntities={totalCountMovies} isEntitiesLoading={isMovieLoading} 
                          entities={movies} title="List of Movies" getItem={getMovieItem}/>

                    {movies.length > 0 && 
                        <PageNavigation totalPages={totalPages} isLoading={isMovieLoading} 
                                        currentPage={currentPage} changePage={changePage} />
                    }
                </div>
            }
        </div>
    );
}

export default Movies;