import React, { useEffect, useState } from 'react';
import MovieService from '../API/MovieService';
import Button from '../components/UI/Button/Button';
import Loader from '../components/UI/Loader/Loader';
import MovieFilter from '../components/UI/Filter/MovieFilter';
import MovieForm from '../components/UI/Movie/MovieForm';
import MovieList from '../components/UI/Movie/MovieList';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import { contains } from '../utils/contains';
import useDebounce from '../hooks/useDebounce';
import PageNavigation from '../components/UI/PageNavigation/PageNavigation';
import Creator from '../components/UI/Creator/Creator';
import '../styles/pages.scss';


function Movies() {
    const [movies, setMovies] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [limitMovies, setLimitMovies] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState({ title: '', genres: [], actors: [] });
    const debouncedFilter = useDebounce(filter, 1000); //Processing the request after 1s
    const [visibleCreature, setVisibleCreature] = useState(false);
    const [totalCountMovies, setTotalCountMovies] = useState(0);

    const [fetchMovies, isMovieLoading] = useFetching(async (limit, page) => {
        //Recording [limit] movies and getting their actors, genres

        const response =  await MovieService.getMovies(filter.title,
                filter.actors.map(a => a.id),
                filter.genres.map(g => g.id),
                limit, page);

        setTotalCountMovies(response.headers['x-total-count']);
        setTotalPages(getPageCount(response.headers['x-total-count'], limitMovies));

        for (let i = 0; i < response.data.length; i++) {
            response.data[i] = {
                ...response.data[i],
                genres: await MovieService.getGenres(response.data[i].id),
                actors: await MovieService.getActors(response.data[i].id)
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
            movie = {
                ...movie, premiereYear: Number(movie.premiereYear)
            }
            await MovieService.addMovie(movie)
            movie = {
                ...movie, id: await MovieService.getLast()
            }
            
            movie.genres.map(genre => MovieService.addGenre(movie.id, genre.id))
            movie.actors.map(actor => MovieService.addActor(movie.id, actor.id))

            setVisibleCreature(false);
            setTotalCountMovies(Number(totalCountMovies) + 1);

            if (movies.length < 10) {
                if (contains(newMovie.genres.map(g => g.id), filter.genres.map(g => g.id)) &&
                    contains(newMovie.actors.map(a => a.id), filter.actors.map(a => a.id)) &&
                    newMovie.title.toLowerCase().includes(filter.title.toLowerCase()))
                    setMovies([...movies, newMovie])
            } else if (currentPage === totalPages) {
                setTotalPages(totalPages + 1)
            }
        }
    }

    const removeMovie = async (movie) => {
        await MovieService.deleteMovie(movie.id)
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

            {isMovieLoading &&
                <div className="loader"><Loader /></div>
            }  

            {!isMovieLoading && 
                <div>
                    <MovieList countMovies={totalCountMovies} isMovieLoading={isMovieLoading} remove={removeMovie} movies={movies} title="Movies" />
                    {totalCountMovies > 0 && 
                    <PageNavigation totalPages={totalPages} isLoading={isMovieLoading} currentPage={currentPage} changePage={changePage} />
                    }
                </div>
            }

        </div>
    );
}


export default Movies;