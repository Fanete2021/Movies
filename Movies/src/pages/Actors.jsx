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
import { sleep } from '../utils/sleep';

function Actors() {
    const [changeableActor, setChangeableActor] = useState();
    const [actors, setActors] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [limitActors, setLimitActors] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleForm, setVisibleForm] = useState(false);
    const [typeForm, setTypeForm] = useState("create");
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
        setTotalPages(getPageCount(response.headers['x-total-count'], limitActors));
        setCurrentPage(page);

        setActors(response.data);
    })

    useEffect(() => {
        fetchActors(limitActors, 1);
    }, [])

    const createActor = async (actor) => {
        if(totalPages === 0)
        {
            setTotalPages(1);
        }
        
        actor = {
            ...actor, id: await Service.addEntity(actor, APIService)
        }

        setVisibleForm(false);
        setTotalCountActors(Number(totalCountActors) + 1);

        if (actors.length < 10) {
            setActors([...actors, actor]);
        }
        
        setTotalPages(getPageCount(parseInt(totalCountActors) + 1, limitActors));
    }

    const changeActor = async (actor) => {   
        setVisibleForm(false);
        await Service.changeEntity(actor, APIService);

        let indexActor = actors.findIndex(a => a.id === actor.id);
        setActors([...actors, actors[indexActor] = actor]);
    }

    const removeActor = async (actor) => {
        await Service.deleteEntity(actor.id, APIService);

        setTotalCountActors(totalCountActors - 1);
        let filterActors = actors.filter(a => a.id !== actor.id);

        setActors(filterActors);

        if (currentPage !== totalPages)
        {
            let params = {
                limit: 1,
                page: currentPage * 10
            };

            const response =  await Service.getEntities(APIService, params);
            filterActors = [...filterActors, ...response.data];

            sleep(400);
            setActors(filterActors);
        }

        if ((totalCountActors - 1) % 10 === 0)
            setTotalPages(totalPages - 1);

        if (currentPage !== 1 && actors.length === 1) 
        {
            setCurrentPage(currentPage - 1);
            fetchActors(limitActors, currentPage - 1);
        }
       
    }

    const changePage = (page) => {
        if (page < 1)
        {
            setCurrentPage(1);
            fetchActors(limitActors, 1);
        }
        else if (page > totalPages)
        {
            setCurrentPage(totalPages);
            fetchActors(limitActors, totalPages);
        }
        else 
        {
            setCurrentPage(page);
            fetchActors(limitActors, page);
        }
    }

    const changeStateForm = (type) => {
        setVisibleForm(true); 
        setTypeForm(type);
    }

    const getActorItem = (actor) => {
        return <ActorItem isAuth={isAuth} remove={removeActor} actor={actor}
                          changeStateForm={changeStateForm} setChangeableActor={setChangeableActor}/>
    }

    return (
        <div className="actors">
            <Button disabled={!isAuth} onClick={() => {changeStateForm("create"); setChangeableActor();}}>
                Add
            </Button>

            {visibleForm &&
                <Creator setVisible={setVisibleForm} >
                    <ActorForm create={createActor} change={changeActor} type={typeForm} changeableActor={changeableActor}/>
                </Creator>
            }

            <hr/>

            {isActorsLoading 
                ?
                <div className="loader"><Loader /></div>
                :
                <div>
                    <List countEntities={totalCountActors} isEntitiesLoading={isActorsLoading} 
                          entities={actors} title="List of Actors" getItem={getActorItem} />

                    {totalCountActors > 0 &&
                        <PageNavigation totalPages={totalPages} isLoading={isActorsLoading} 
                                        currentPage={currentPage} changePage={changePage} />
                    }
                </div>
            }
        </div>
    )
}


export default Actors;