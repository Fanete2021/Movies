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
import '../styles/pages.scss';
import Service from '../API/Service';
import MovieItem from '../components/UI/Movie/MovieItem';
import List from '../components/UI/List/List';


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

    const [fetchMovies, isMovieLoading] = useFetching(async (limit, page) => {
        //Recording [limit] movies and getting their actors, genres

        let params = {
            title: filter.title,
            idActors: filter.actors.map(a => a.id),
            idGenres: filter.genres.map(g => g.id),
            limit: limit,
            page: page
        };

        const response =  await Service.getEntities(APIService, params);

        setTotalCountMovies(response.headers['x-total-count']);
        setTotalPages(getPageCount(response.headers['x-total-count'], limitMovies));

        for (let i = 0; i < response.data.length; i++) {
            response.data[i] = {
                ...response.data[i],
                genres: await Service.getDependencies(APIService, response.data[i].id, "genres"),
                actors: await Service.getDependencies(APIService, response.data[i].id, "actors")
            }
        };

        setMovies(response.data);
    })

    const resetView = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        fetchMovies(limitMovies, currentPage)
    }, [])

    useEffect(() => {
        resetView()
        fetchMovies(limitMovies, currentPage)
    }, [debouncedFilter, currentPage])

    useEffect(() => {
        changePage(1)
    }, [filter])

    const createMovie = async (movie, count) => {
        for(let i = 0; i < count; ++i)
        {
            await Service.addEntity(movie, APIService)
            movie = {
                ...movie, id: await Service.getLast(APIService)
            }
            
            movie.genres.map(genre => Service.addDependencies(APIService, "genres",{idMovie: movie.id, idGenre: genre.id}))
            movie.actors.map(actor => Service.addDependencies(APIService, "actors", {idMovie: movie.id, idActor: actor.id}))

            setVisibleCreature(false);
            setTotalCountMovies(Number(totalCountMovies) + 1);

            if (movies.length < 10) {
                if (contains(movie.genres.map(g => g.id), filter.genres.map(g => g.id)) &&
                    contains(movie.actors.map(a => a.id), filter.actors.map(a => a.id)) &&
                    movie.title.toLowerCase().includes(filter.title.toLowerCase()))
                    setMovies([...movies, movie])
            } else if (currentPage === totalPages) {
                setTotalPages(totalPages + 1)
            }
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
        return <MovieItem remove={removeMovie} movie={movie} key={id} />
    }

    return (
        <div className="infoBlock">
            <MovieFilter filter={filter} setFilter={setFilter} />

            <Button onClick={() => setVisibleCreature(true)}>
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