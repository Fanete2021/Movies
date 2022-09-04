import React, { useEffect, useState } from 'react';
import ActorService from '../API/ActorService';
import ActorForm from '../components/UI/Actor/ActorForm';
import ActorList from '../components/UI/Actor/ActorList';
import Button from '../components/UI/Button/Button';
import Creator from '../components/UI/Creator/Creator';
import Loader from '../components/UI/Loader/Loader';
import PageNavigation from '../components/UI/PageNavigation/PageNavigation';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import '../styles/pages.scss';

function Actors() {
    const [visibleCreature, setVisibleCreature] = useState(false);
    const [actors, setActors] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limitActors, setLimitActors] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCountActors, setTotalCountActors] = useState(0);

    const [fetchActors, isActorsLoading] = useFetching(async (limit, page) => {
        const response = await ActorService.getActors('', [], limit, page);

        setTotalCountActors(response.headers['x-total-count']);        
        setTotalPages(getPageCount(response.headers['x-total-count'], limitActors))

        setActors(response.data)
    })

    useEffect(() => {
        fetchActors(limitActors, currentPage)
    }, [])

    useEffect(() => {
        resetView()
        fetchActors(limitActors, currentPage)
    }, [currentPage])

    const createActor = async (newActor) => {
        await ActorService.addActor(newActor)

        newActor = {
            ...newActor, id: await ActorService.getLast()
        }

        setVisibleCreature(false);
        setTotalCountActors(Number(totalCountActors) + 1);

        if (actors.length < 10) {
            setActors([...actors, newActor])
        }
        else if (currentPage === totalPages) {
            setTotalPages(totalPages + 1)
        }
    }

    const removeActor = async (actor) => {
        await ActorService.deleteActor(actor.id)
        let offset = 0
        
        if (currentPage !== 1 && actors.length === 1) {
            offset = 1
            setCurrentPage(currentPage - 1)
        }

        fetchActors(limitActors, currentPage - offset)
    }

    const resetView = () => {
        window.scrollTo(0, 0);
    }

    const changePage = (newPage) => {
        resetView();

        if (newPage < 1)
            setCurrentPage(1); 
        else if (newPage > totalPages)
            setCurrentPage(totalPages);
        else {
            setCurrentPage(newPage);
        }
    }

    return (
        <div className="infoBlock">
            <Button onClick={() => setVisibleCreature(true)}>
                Add
            </Button>

            {visibleCreature &&
                <Creator setVisible={setVisibleCreature} >
                    <ActorForm create={createActor} />
                </Creator>
            }

            <hr/>

            {isActorsLoading &&
                <div className="loader"><Loader /></div>
            }

            {!isActorsLoading &&
                <div>
                    <ActorList countActors={totalCountActors} isActorsLoading={isActorsLoading} remove={removeActor} actors={actors} title="Actors" />
                    {totalCountActors > 0 &&
                    <PageNavigation totalPages={totalPages} isLoading={isActorsLoading} currentPage={currentPage} changePage={changePage} />
                    }
                </div>
            }
        </div>
    )
}


export default Actors;

