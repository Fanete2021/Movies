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


function Movies() {
    const [movies, setMovies] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [limitMovies, setLimitMovies] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState({ title: '', genres: [], actors: [] });
    const debouncedFilter = useDebounce(filter, 1000); //Processing the request after 1s
    const [visibleCreature, setVisibleCreature] = useState(false);
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
            page: page
        };

        const response =  await Service.getEntities(APIService, params);

        setTotalCountMovies(response.headers['x-total-count']);
        setTotalPages(getPageCount(response.headers['x-total-count'], limitMovies));

        setMovies(response.data);
    })
    
    const resetView = () => {
        window.scrollTo(0, 0);
    }

    //When the page starts, we load the movies
    useEffect(() => {
        fetchMovies(limitMovies, currentPage)
    }, [])

    //When changing the page or the interval between the filter,
    useEffect(() => {
        resetView()
        fetchMovies(limitMovies, currentPage)
    }, [debouncedFilter, currentPage])

    //When changing the filter, we return to the first page
    useEffect(() => {
        changePage(1)
    }, [filter])

    const createMovie = async (movie) => {
        movie = {
            ...movie, id: await Service.addEntity(movie, APIService)
        }
        
        movie.genres.map(genre => Service.addDependencies(APIService, "genres",{MovieId: movie.id, GenreId: genre.id}))
        movie.actors.map(actor => Service.addDependencies(APIService, "actors", {MovieId: movie.id, ActorId: actor.id}))

        setVisibleCreature(false);
        setTotalCountMovies(Number(totalCountMovies) + 1);

        if (movies.length < 10) {
            //Checking for a match with the filter
            if (contains(movie.genres.map(g => g.id), filter.genres.map(g => g.id)) &&
                contains(movie.actors.map(a => a.id), filter.actors.map(a => a.id)) &&
                movie.title.toLowerCase().includes(filter.title.toLowerCase()))
            {
                setMovies([...movies, movie])
            }
        } else if (currentPage === totalPages) {
            setTotalPages(totalPages + 1)
        }
    }

    const removeMovie = async (movie) => {
        await Service.deleteEntity(movie.id, APIService)
        let offset = 0

        if (currentPage !== 1 && movies.length === 1) {
            offset = 1
            setCurrentPage(currentPage - 1)
        }

        fetchMovies(limitMovies, currentPage - offset)
    }
        
    const changePage = (newPage) => {
        resetView();

        if (newPage < 1)
            setCurrentPage(1); 
        else if (newPage > totalPages && totalPages > 0)
            setCurrentPage(totalPages);
        else {
            setCurrentPage(newPage);
        }
    }

    const getMovieItem = (movie, id) => {
        return <MovieItem remove={removeMovie} movie={movie} key={id} isAuth={isAuth} />
    }

    return (
        <div className="infoBlock">
            <div className="filter">
                <MovieFilter filter={filter} setFilter={setFilter}/>
            </div>

            <Button disabled={!isAuth} onClick={() => setVisibleCreature(true)}>
                Add
            </Button>

            {visibleCreature &&
                <Creator setVisible={setVisibleCreature}>
                    <MovieForm create={createMovie} />
                </Creator>
            }

            <hr/>

            {isMovieLoading 
                ?
                <div className="loader"><Loader /></div>
                :
                <div>
                    <List countEntities={totalCountMovies} isEntitiesLoading={isMovieLoading} entities={movies} title="List of Movies" getItem={getMovieItem} />
                    {totalCountMovies > 0 && 
                        <PageNavigation totalPages={totalPages} isLoading={isMovieLoading} currentPage={currentPage} changePage={changePage} />
                    }
                </div>
            }
        </div>
    );
}


export default Movies;