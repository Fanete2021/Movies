import React from 'react';
import { useMemo } from 'react';
import cl from './pageNavigation.module.scss';

const PageNavigation = ({ totalPages, isLoading, currentPage, changePage}) => {
    const arrowsClasses = useMemo( () => {
        let arrowsClasses = [cl.navigation__dPrev, cl.navigation__prev, cl.navigation__next, cl.navigation__dNext];

        if (currentPage === 1)
        {
            arrowsClasses[0] = cl.navigation__disDPrev;
            arrowsClasses[1] = cl.navigation__disPrev;
        }

        if (currentPage === totalPages)
        {
            arrowsClasses[2] = cl.navigation__disNext;
            arrowsClasses[3] = cl.navigation__disDNext;
        }

        return arrowsClasses;
    }, [totalPages, currentPage]);

    const pages = useMemo(() => {
        let pages = [];
        var beginningPage = 1;
    
        if (currentPage > 4)
            beginningPage = currentPage - 4;

        if (currentPage > 4 && currentPage + 4 > totalPages)
            beginningPage = beginningPage + totalPages - currentPage - 4;
        
        for(; beginningPage <= totalPages && pages.length < 9; ++beginningPage)
                pages.push(beginningPage);

        return pages;
    }, [totalPages, currentPage]);

    return (
        <div>
            {(!isLoading) &&
                <div className={cl.navigation}>
                    <div className={arrowsClasses[0]} onClick={() => changePage(currentPage - 15)}></div>
                    <div className={arrowsClasses[1]} onClick={() => changePage(currentPage - 1)}></div>

                    <div className={cl.navigation__pages}>
                        {pages.map(page =>
                        {
                            if (page === currentPage)
                                return (
                                    <div className={`${cl.navigation__numberPage} ${cl.navigation__currentPage}`}
                                        onClick={() => changePage(page)}
                                        key={page + Math.random()}>
                                        {page}
                                    </div>
                                )
                            
                            return (
                                <div className={cl.navigation__numberPage}
                                    onClick={() => changePage(page)}
                                    key={page + Math.random()}>
                                    {page}
                                </div>
                            )
                        }
                        )}
                    </div>

                    <div className={arrowsClasses[2]} onClick={() => changePage(currentPage + 1)}></div>
                    <div className={arrowsClasses[3]} onClick={() => changePage(currentPage + 10)}></div>
                </div>
            }
        </div>
    );
};

export default PageNavigation;