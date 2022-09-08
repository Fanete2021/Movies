import React, { useEffect, useState } from 'react';
import ActorForm from '../components/UI/Actor/ActorForm';
import Button from '../components/UI/Button/Button';
import Creator from '../components/UI/Creator/Creator';
import Loader from '../components/UI/Loader/Loader';
import PageNavigation from '../components/UI/PageNavigation/PageNavigation';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import '../styles/infoPages.scss';
import Service from '../API/Service';
import ActorItem from '../components/UI/Actor/ActorItem';
import List from '../components/UI/List/List';
import { useContext } from 'react';
import { Context } from '../context';

function Actors() {
    const [visibleCreature, setVisibleCreature] = useState(false);
    const [actors, setActors] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limitActors, setLimitActors] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCountActors, setTotalCountActors] = useState(0);
    const APIService = 'actors';
    const {isAuth} = useContext(Context);

    const [fetchActors, isActorsLoading] = useFetching(async (limit, page) => {

        let params = {
            limit: limit,
            page: page
        };

        const response = await Service.getEntities(APIService, params);

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
        await Service.addEntity(newActor, APIService)

        newActor = {
            ...newActor, id: await Service.getLast(APIService)
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
        await Service.deleteEntity(actor.id, APIService)
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

    const getActorItem = (actor, id) => {
        return <ActorItem isAuth={isAuth} remove={removeActor} actor={actor} key={id} />
    }

    return (
        <div className="infoBlock">
            {isAuth &&
                <Button onClick={() => setVisibleCreature(true)}>
                    Add
                </Button>
            }  

            {visibleCreature &&
                <Creator setVisible={setVisibleCreature} >
                    <ActorForm create={createActor} />
                </Creator>
            }

            <hr/>

            {isActorsLoading 
                ?
                <div className="loader"><Loader /></div>
                :
                <div>
                    <List countEntities={totalCountActors} isEntitiesLoading={isActorsLoading} entities={actors} title="List of Actors" getItem={getActorItem} />
                    {totalCountActors > 0 &&
                        <PageNavigation totalPages={totalPages} isLoading={isActorsLoading} currentPage={currentPage} changePage={changePage} />
                    }
                </div>
            }
        </div>
    )
}


export default Actors;